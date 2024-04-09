"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { debounce, set } from "lodash";
import { OpenLibraryResponse } from "@/types/openLibraryTypes";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import NextImage from "next/image";
import Loader from "@/components/Loader";
import CoverSelection from "./CoverSelection";

interface Book {
  title: string;
  author?: string;
  cover?: string;
  key: string;
}

interface AutocompleteProps {
  open: boolean;
  selectedBook: Book | null;
  setSelectedBook: (
    value: Book | null | ((prevVar: Book | null) => Book | null)
  ) => void;
  toggleCoverSelection: boolean;
  setToggleCoverSelection: (toggle: boolean) => void;
}

export default function ({
  open,
  selectedBook,
  setSelectedBook,
  toggleCoverSelection,
  setToggleCoverSelection,
}: AutocompleteProps) {
  const [suggestions, setSuggestions] = useState<OpenLibraryResponse[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const [cover, setCover] = useState<string>("");

  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const latestRequest = useRef<number>(0);

  const fetchBookSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query) return;
      const requestId = Date.now();
      latestRequest.current = requestId;
      try {
        setLoading(true);

        const response = await fetch(
          `/api/searchbooks?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (latestRequest.current !== requestId) {
          return;
        }

        if (response.ok) {
          const formattedSuggestions: OpenLibraryResponse[] = data.docs.map(
            (doc: OpenLibraryResponse) => ({
              key: doc.key,
              title: doc.title,
              author_name: doc.author_name,
              cover_i: doc.cover_i,
            })
          );
          setSuggestions(formattedSuggestions);
          setActiveIndex(0);

          formattedSuggestions.forEach((suggestion) => {
            if (suggestion.cover_i) {
              const img = new Image();
              img.src = `https://covers.openlibrary.org/b/id/${suggestion.cover_i}-M.jpg`;
            }
          });
        } else {
          throw new Error(data.message || "An error occurred");
        }
      } catch (error) {
        console.error("Fetching book suggestions failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (!hasSelected && inputValue) {
      fetchBookSuggestions(inputValue);
    }
    if (inputValue.length === 0) {
      setSuggestions([]);
      setCover("");
    }
  }, [inputValue, hasSelected]);

  useEffect(() => {
    if (suggestionRefs.current[activeIndex]) {
      suggestionRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex, suggestions.length]);

  useEffect(() => {
    if (!open) {
      setSuggestions([]);
      setInputValue("");
    }
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (suggestions.length > 0) {
          handleSuggestionClick(activeIndex);
        }
        break;
    }
  };

  useEffect(() => {
    if (suggestions.length > 0) {
      setCover(
        suggestions[activeIndex]?.cover_i
          ? `https://covers.openlibrary.org/b/id/${suggestions[activeIndex]?.cover_i}-M.jpg`
          : ""
      );
    }
  }, [suggestions, activeIndex, setCover]);

  useEffect(() => {}, [setCover, toggleCoverSelection]);

  const handleSuggestionClick = (index: number) => {
    setActiveIndex(index);

    setSuggestions([]);
    setInputValue(
      suggestions[index].title +
        " by " +
        suggestions[index].author_name?.join(", ")
    );
    setCover(
      `https://covers.openlibrary.org/b/id/${suggestions[index].cover_i}-M.jpg`
    );
    setHasSelected(true);
    setSelectedBook({
      title: suggestions[index].title,
      author: suggestions[index].author_name?.join(", "),
      cover: cover,
      key: suggestions[index].key,
    });
  };

  const handleToggleCoverSelection = () => {
    setToggleCoverSelection(!toggleCoverSelection);
  };

  return (
    <>
      {toggleCoverSelection ? (
        <CoverSelection
          selectedBook={selectedBook}
          setCover={setCover}
          setToggleCoverSelection={setToggleCoverSelection}
          setSelectedBook={setSelectedBook}
        />
      ) : (
        <>
          <div className="h-32 w-24 bg-muted rounded mx-auto mb-4 relative ">
            {cover && (
              <button
                onClick={handleToggleCoverSelection}
                className={`relative flex items-center justify-center ${
                  hasSelected && "group"
                } `}
                disabled={!hasSelected}
              >
                <NextImage
                  src={cover}
                  alt="Book Cover"
                  className={`rounded h-32 object-cover relative z-10 group-hover:opacity-70 transition-opacity`}
                  width={128}
                  height={96}
                />
                <span
                  className={`absolute z-10 left-0 leading-4 text-center opacity-0 group-hover:flex group-hover:opacity-100 delay-100 items-center py-2 m-2 justify-center shadow-lg`}
                >
                  Change Cover
                </span>
              </button>
            )}
          </div>
          <div className="relative">
            <Input
              placeholder="Search for a book..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
                setHasSelected(false);
              }}
              value={inputValue}
              onKeyDown={handleKeyDown}
            />
            {loading && (
              <span className="absolute z-20 right-2 top-2">
                <Loader />
              </span>
            )}
          </div>
          <ScrollArea
            className={` ${suggestions.length > 0 && "h-56 py-1 mt-1"}`}
          >
            {suggestions.map((suggestion, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  key={suggestion.key}
                  className={`cursor-pointer px-2 py-1 text-muted-foreground ${
                    isActive ? "text-accent-foreground bg-accent" : ""
                  }`}
                  onClick={() => handleSuggestionClick(index)}
                >
                  {suggestion.title} by {suggestion.author_name?.join(", ")}
                </div>
              );
            })}
          </ScrollArea>
        </>
      )}
    </>
  );
}
