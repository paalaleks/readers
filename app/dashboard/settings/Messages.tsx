"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  RefObject,
  PointerEvent,
} from "react";
import {
  Messages,
  StyledMessageResult,
  ContentState,
  SavedSuccessfully,
  LastFocused,
} from "@/types/project.types";
import { createClient } from "@/utils/supabase/client";
import { revalidateSettingsPath } from "./(sa)/revalidatePage";
import SavedAlert from "@/components/SavedAlert";
import { Button } from "@/components/ui/button";

export default function MessagesComponent({
  styledMessages,
  staticUserId,
}: {
  styledMessages: StyledMessageResult;
  staticUserId: string;
}) {
  const {
    styledSubject,
    styledBody,
    qrStyledSubject,
    qrStyledBody,
  } = styledMessages;

  const [contentState, setContentState] = useState<ContentState>({
    libSubject: styledSubject || "",
    libBody: styledBody || "",
    qrSubject: qrStyledSubject || "",
    qrBody: qrStyledBody || "",
  });

  const [savedSuccessfully, setSavedSuccessfully] = useState<SavedSuccessfully>(
    {
      fieldset: "",
      savedToDb: "",
    }
  );

  const [lastSavedContentState, setLastSavedContentState] = useState<
    ContentState
  >(contentState);

  const supabase = createClient();

  const extractTextFromHTML = useCallback((htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  }, []);

  const normalizeContent = useCallback(
    (content: ContentState) => {
      return {
        libSubject: extractTextFromHTML(content.libSubject),
        libBody: extractTextFromHTML(content.libBody),
        qrSubject: extractTextFromHTML(content.qrSubject),
        qrBody: extractTextFromHTML(content.qrBody),
      };
    },
    [extractTextFromHTML]
  );

  const initializeContent = useCallback(() => {
    if (libSubjectRef.current)
      libSubjectRef.current.innerHTML = contentState.libSubject;
    if (libBodyRef.current) libBodyRef.current.innerHTML = contentState.libBody;
    if (qrSubjectRef.current)
      qrSubjectRef.current.innerHTML = contentState.qrSubject;
    if (qrBodyRef.current) qrBodyRef.current.innerHTML = contentState.qrBody;
  }, [contentState]);

  useEffect(() => {
    initializeContent();
  }, [initializeContent]);

  const hasContentChanged = useCallback(
    (currentContent: ContentState, lastSavedContent: ContentState) => {
      const currentNormalized = normalizeContent(currentContent);
      const lastSavedNormalized = normalizeContent(lastSavedContent);
      return (
        JSON.stringify(currentNormalized) !==
        JSON.stringify(lastSavedNormalized)
      );
    },
    [normalizeContent] // Add any dependencies if `normalizeContent` uses external values
  );

  const saveToDatabase = useCallback(
    async (plainTextValues: Messages) => {
      if (!hasContentChanged(plainTextValues, lastSavedContentState)) {
        console.log("No changes detected, skipping save to database.");
        return;
      }
      let { error } = await supabase
        .from("myLibrary")
        .update({ messages: plainTextValues })
        .eq("user_id", staticUserId)
        .select("messages");

      setSavedSuccessfully((currentState) => ({
        ...currentState,
        savedToDb: "true",
      }));

      setLastSavedContentState(contentState);

      setTimeout(() => {
        setSavedSuccessfully((currentState) => ({
          ...currentState,
          savedToDb: "false",
        }));
      }, 2000);
      revalidateSettingsPath();

      if (error) throw error;
    },
    [
      contentState,
      lastSavedContentState,
      staticUserId,
      hasContentChanged,
      supabase,
    ]
  );

  useEffect(() => {
    const libSubjectText = extractTextFromHTML(contentState.libSubject);
    const libBodyText = extractTextFromHTML(contentState.libBody);
    const qrSubjectText = extractTextFromHTML(contentState.qrSubject);
    const qrBodyText = extractTextFromHTML(contentState.qrBody);

    const plainTextValues: Messages = {
      libSubject: libSubjectText,
      libBody: libBodyText,
      qrSubject: qrSubjectText,
      qrBody: qrBodyText,
    };

    saveToDatabase(plainTextValues);
  }, [contentState, saveToDatabase, extractTextFromHTML]);

  useEffect(() => {
    (async () => {
      try {
        setContentState({
          libSubject: styledSubject || "",
          libBody: styledBody || "",
          qrSubject: qrStyledSubject || "",
          qrBody: qrStyledBody || "",
        });
      } catch (error) {
        console.error(
          "An error occurred while fetching styled messages:",
          error
        );
      }
    })();
  }, [qrStyledBody, qrStyledSubject, styledBody, styledSubject]);

  const handleContentChange = useCallback(
    async (id: string, content: string, fieldset: string) => {
      try {
        setContentState((prevState) => ({
          ...prevState,
          [id]: content,
        }));
        setSavedSuccessfully((currentState) => ({
          ...currentState,
          fieldset: fieldset,
        }));
      } catch (error) {
        setSavedSuccessfully({ fieldset: "", savedToDb: "" });
        (error as Error).message = `An error occurred while updating the content: ${
          (error as Error).message
        }`;
      }
    },
    []
  );

  const libSubjectRef = useRef<HTMLParagraphElement>(null);
  const libBodyRef = useRef<HTMLParagraphElement>(null);
  const qrSubjectRef = useRef<HTMLParagraphElement>(null);
  const qrBodyRef = useRef<HTMLParagraphElement>(null);

  const [lastFocused, setLastFocused] = useState<LastFocused>({
    ref: libSubjectRef,
    fieldset: null,
  });

  const handleFocus = (ref: RefObject<HTMLParagraphElement>) => {
    const parentFieldset = ref.current?.closest(
      "fieldset"
    ) as HTMLFieldSetElement | null;
    setLastFocused({ ref, fieldset: parentFieldset });
  };

  const handleClick = (text: string) => (
    event: PointerEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const buttonFieldset = event.currentTarget.closest("fieldset");

    if (buttonFieldset !== lastFocused.fieldset) {
      console.error(
        "Button and contentEditable element belong to different groups."
      );
      return;
    }

    const currentRef = lastFocused.ref.current;

    if (currentRef && document.activeElement === currentRef) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      const span = document.createElement("span");
      span.classList.add("inserted-text");
      span.textContent = text;
      span.contentEditable = "false";

      range.insertNode(span);

      const newRange = document.createRange();
      newRange.setStartAfter(span);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  return (
    <>
      <fieldset
        id="LibraryRequestMessage"
        className="border rounded-xl border-accent mx-4 px-4 pt-6 pb-8 mb-8 relative"
      >
        <legend className="bg-background px-2 text-primary/70 h-0 flex items-center">
          <h3>Library request message</h3>
        </legend>
        <div className="mx-auto max-w-md w-full flex flex-col justify-center space-y-4 ">
          <div className="space-x-2 space-y-2 text-center">
            <Button
              variant="secondary"
              name="libBookTitle"
              onPointerDown={handleClick("TITLE")}
              className="bg-accent px-3 py-1 w-max rounded-md "
            >
              Book Title
            </Button>
            <Button
              variant="secondary"
              name="libBookAuthor"
              onPointerDown={handleClick("AUTHOR")}
              className="bg-accent px-3 py-1 w-max rounded-md "
            >
              Book Author
            </Button>
            <Button
              variant="secondary"
              name="libOwnerName"
              onPointerDown={handleClick("OWNER")}
              className="bg-accent px-3 py-1 w-max rounded-md "
            >
              Book Owner
            </Button>
          </div>
          <p
            onBlur={() =>
              handleContentChange(
                "libSubject",
                libSubjectRef.current?.innerHTML || "",
                "LibraryRequestMessage"
              )
            }
            onFocus={() => handleFocus(libSubjectRef)}
            ref={libSubjectRef}
            id="libSubject"
            className="border rounded px-3 py-2 border-accent  bg-background w-full overflow-y-auto focus:outline-none focus:outline-primary focus:ring-0 relative"
            contentEditable
            suppressContentEditableWarning
          ></p>

          <p
            onBlur={() =>
              handleContentChange(
                "libBody",
                libBodyRef.current?.innerHTML || "",
                "LibraryRequestMessage"
              )
            }
            onFocus={() => handleFocus(libBodyRef)}
            ref={libBodyRef}
            id="libBody"
            className="border rounded px-3 py-2 border-accent bg-background min-h-32 w-full overflow-y-auto focus:outline-none focus:outline-primary focus:ring-0 "
            contentEditable
            suppressContentEditableWarning
          ></p>
          {savedSuccessfully.fieldset === "LibraryRequestMessage" &&
          savedSuccessfully.savedToDb === "true" ? (
            <SavedAlert />
          ) : (
            ""
          )}
        </div>
      </fieldset>

      <fieldset
        id="QrCodeBorrowMessage"
        className="border rounded-xl border-accent mx-4 px-4 pt-6 pb-8 mb-8 relative"
      >
        <legend className="bg-background px-2 text-primary/70 h-0 flex items-center">
          <h3>Qr code borrow message</h3>
        </legend>
        <div className="mx-auto max-w-md w-full flex flex-col justify-center space-y-4 ">
          <div className="space-x-2 space-y-2 text-center">
            <Button
              variant="secondary"
              name="qrBookTitle"
              onPointerDown={handleClick("TITLE")}
              className="bg-accent px-3 py-1 w-max rounded-md "
            >
              Book Title
            </Button>
            <Button
              variant="secondary"
              name="qrBookAuthor"
              onPointerDown={handleClick("AUTHOR")}
              className="bg-accent px-3 py-1 w-max rounded-md "
            >
              Book Author
            </Button>
            <Button
              variant="secondary"
              name="qrOwnerName"
              onPointerDown={handleClick("OWNER")}
              className="bg-accent px-3 py-1 w-max rounded-md "
            >
              Book Owner
            </Button>
          </div>
          <p
            onBlur={() =>
              handleContentChange(
                "qrSubject",
                qrSubjectRef.current?.innerHTML || "",
                "QrCodeBorrowMessage"
              )
            }
            onFocus={() => handleFocus(qrSubjectRef)}
            ref={qrSubjectRef}
            id="qrSubject"
            className="border rounded px-3 py-2 border-accent  bg-background w-full overflow-y-auto focus:outline-none focus:outline-primary focus:ring-0 "
            contentEditable
            suppressContentEditableWarning
          ></p>

          <p
            onBlur={() =>
              handleContentChange(
                "qrBody",
                qrBodyRef.current?.innerHTML || "",
                "QrCodeBorrowMessage"
              )
            }
            onFocus={() => handleFocus(qrBodyRef)}
            ref={qrBodyRef}
            id="qrBody"
            className="border rounded px-3 py-2 border-accent  bg-background min-h-32 w-full overflow-y-auto focus:outline-none focus:outline-primary focus:ring-0 "
            contentEditable
            suppressContentEditableWarning
          ></p>
          {savedSuccessfully.fieldset === "QrCodeBorrowMessage" &&
          savedSuccessfully.savedToDb === "true" ? (
            <SavedAlert />
          ) : (
            ""
          )}
        </div>
      </fieldset>
    </>
  );
}
