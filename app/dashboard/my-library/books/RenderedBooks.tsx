"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import * as RadixPopover from "@radix-ui/react-popover";
import { Plus, Trash } from "lucide-react";
import { useProvider } from "../../Provider";
import { Book, MyLibrary, CodeSeriesItem } from "@/types/project.types";
import { revalidateBooksPath } from "../(sa)/revalidatePage";

export default function RenderedBooks({
  staticMyLibrary,
  staticCodeSeries,
  staticUserId,
}: {
  staticMyLibrary: Book[];
  staticCodeSeries: CodeSeriesItem[];
  staticUserId: string;
}) {
  const [myLibrary, setMyLibrary] = useState<MyLibrary>({
    books: staticMyLibrary,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { setOpen } = useProvider();
  const [selectedBookUrl, setSelectedBookUrl] = useState<string | null>(null);

  const supabase = createClient();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const fetchLibrary = useCallback(async () => {
    let { data: libraryData, error } = await supabase
      .from("myLibrary")
      .select("books, codeSeries, user_id")
      .eq("user_id", staticUserId)
      .single();

    if (error) {
      console.error("Error fetching library", error, "UserID:", staticUserId);
      return;
    }

    const fetchedLibrary: MyLibrary = libraryData
      ? { books: libraryData.books }
      : { books: null };

    setMyLibrary(fetchedLibrary);
    revalidateBooksPath();
  }, [supabase, staticUserId]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("message") === "Success!") {
      fetchLibrary();
      setTimeout(() => {
        replace("/dashboard/my-library/books");
      }, 3000);
    }
  }, [searchParams, replace, fetchLibrary]);

  const findBookByCode = (code: string) => {
    return myLibrary?.books?.find((book) => book.url === code);
  };

  const handleDeleteBook = async () => {
    if (!selectedBookUrl) return;
    if (!myLibrary || !myLibrary.books) return;

    const updatedBooks = myLibrary.books.map((book) => {
      if (book.url === selectedBookUrl) {
        return {
          ...book,
          url: selectedBookUrl,
          title: "",
          author: "",
          cover: "",
          key: "",
          status: "DELETED",
        };
      }
      return book;
    });

    const { error } = await supabase
      .from("myLibrary")
      .update({ books: updatedBooks })
      .eq("user_id", staticUserId)
      .select();

    if (error) {
      console.error("Failed to update book status in Supabase:", error);
    } else {
      fetchLibrary();
    }
  };

  async function updateBookField(
    url: string,
    field: "title" | "author",
    value: string
  ): Promise<void> {
    if (!myLibrary || !myLibrary.books) {
      console.error("Books array is null");
      return;
    }

    const bookIndex = myLibrary.books.findIndex(
      (book: Book) => book.url === url
    );

    if (bookIndex === -1) {
      console.error("Book not found");
      return;
    }

    const updatedBooks: Book[] = [...myLibrary.books];
    updatedBooks[bookIndex] = {
      ...updatedBooks[bookIndex],
      [field]: value,
    };

    const { error } = await supabase
      .from("myLibrary")
      .update({ books: updatedBooks })
      .match({ user_id: staticUserId });

    if (error) {
      console.error("Failed to update book", error);
    } else {
      setMyLibrary({ books: updatedBooks });
    }
  }

  function handleEdit(id: string, field: "title" | "author", event: any) {
    const newValue = event.target.textContent;
    updateBookField(id, field, newValue);
  }

  const handleAddBookInSlot = async (code: string) => {
    setSelectedBookUrl(code);
    setOpen(true);
    replace(`/dashboard/my-library/books?slot=${code}`);
  };

  const renderBooks = () => {
    if (staticCodeSeries && staticCodeSeries.length > 0) {
      return staticCodeSeries.map((item, index) => {
        const book = findBookByCode(item.code);
        const handleOpenChange = (open: boolean, url?: string) => {
          if (open) {
            setSelectedBookUrl(url || null);
          } else {
            setSelectedBookUrl(null);
          }
        };

        return (
          <article
            key={`${item.code}-${index}`}
            className="h-full w-24 rounded"
          >
            {book ? (
              book.status === "DELETED" ? (
                <>
                  <button
                    className="w-24 h-32 rounded border border-accent flex justify-center flex-col items-center "
                    onClick={() => handleAddBookInSlot(item.code)}
                  >
                    <div className="flex justify-center flex-col items-center outline-none">
                      <Plus size={16} />
                      <span className="leading-3 mt-2 text-xs">Add book</span>
                    </div>
                  </button>
                  <p className="text-xs mt-1 text-muted-foreground text-center">
                    <span>{item.code}</span>
                  </p>
                </>
              ) : (
                <RadixPopover.Root
                  onOpenChange={(e) =>
                    book.url && handleOpenChange(e, book.url)
                  }
                >
                  <RadixPopover.Anchor className="absolute" />
                  <RadixPopover.Trigger asChild>
                    {loading ? (
                      <div className="h-32 w-24 rounded border border-accent bg-muted animate-pulse"></div>
                    ) : (
                      <Image
                        src={book.cover || ""}
                        alt={book.title || "Book cover"}
                        width={96}
                        height={128}
                        className="h-32 w-24 rounded object-cover cursor-pointer hover:brightness-110 transition-all ease-in-out "
                      />
                    )}
                  </RadixPopover.Trigger>

                  <p
                    className={`text-xs mt-1 ${
                      selectedBookUrl === book?.url
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                  >
                    <span
                      className="font-bold"
                      suppressContentEditableWarning
                      contentEditable
                      onBlur={(event) =>
                        handleEdit(book?.url ?? "", "title", event)
                      }
                    >
                      {book?.title}
                    </span>
                    <br />
                    <span
                      suppressContentEditableWarning
                      contentEditable
                      onBlur={(event) =>
                        handleEdit(book?.url ?? "", "author", event)
                      }
                    >
                      {book?.author}
                    </span>
                  </p>
                  <RadixPopover.Content className="absolute top-0 left-0 bg-background z-10 ">
                    <div className="w-24 h-32 rounded border border-accent flex justify-center flex-col items-center ">
                      <button
                        className="flex justify-center flex-col items-center outline-none"
                        onClick={handleDeleteBook}
                      >
                        <Trash size={16} />
                        <span className="leading-3 mt-2 text-xs">
                          Delete book
                        </span>
                      </button>
                    </div>
                  </RadixPopover.Content>
                </RadixPopover.Root>
              )
            ) : (
              <>
                <div className="h-32 w-24 rounded border border-accent"></div>
                <p className="text-xs mt-1 text-center text-muted-foreground">
                  <span>{item.code}</span>
                </p>
              </>
            )}
          </article>
        );
      });
    }
  };

  return myLibrary?.books === null ? (
    <h2 className="text-xl flex flex-1 items-center justify-center screenMinHeight nav-content-footer -mb-32">
      You need to pair labels.
    </h2>
  ) : (
    <div className="grid gap-x-2 gap-y-2 grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 pb-8">
      {renderBooks()}
    </div>
  );
}