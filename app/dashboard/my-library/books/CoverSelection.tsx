"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";

interface Book {
  title: string;
  author?: string;
  cover?: string;
  key: string;
}

export default function CoverSelection({
  selectedBook,
  setCover,
  setToggleCoverSelection,
  setSelectedBook,
}: {
  setCover: (cover: string) => void;
  setToggleCoverSelection: (toggle: boolean) => void;
  selectedBook: Book | null;
  setSelectedBook: (
    value: Book | null | ((prevVar: Book | null) => Book | null)
  ) => void;
}) {
  const [covers, setCovers] = useState<string[]>([]);

  useEffect(() => {
    const getWorks = async () => {
      const response = await fetch(`/api/worksquery?key=${selectedBook?.key}`);

      const data = await response.json();
      const works = data.covers;
      setCovers(works);
    };
    getWorks();
  }, [selectedBook?.key]);

  const handleChangeCover = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newCover = `https://covers.openlibrary.org/b/id/${
      (e.currentTarget.childNodes[0] as HTMLImageElement).alt
    }-M.jpg`;
    setCover(newCover);
    setSelectedBook((prevBook: Book | null) => {
      if (!prevBook) return null;
      return { ...prevBook, cover: newCover };
    });
    setToggleCoverSelection(false);
  };
  const placeholderBooks = Array.from({ length: 12 }, (_, index) => (
    <div
      key={index}
      className={`h-32 w-24 bg-muted rounded animate-pulse`}
    ></div>
  ));
  return (
    <ScrollArea className="h-[430px]">
      <div className="grid gap-x-2 gap-y-4 grid-cols-2 min-[346px]:grid-cols-3 min-[446px]:grid-cols-4">
        {covers === undefined ? (
          <span className="whitespace-nowrap">No covers found</span>
        ) : covers.length ? (
          covers.map((cover, index) => {
            return (
              <button key={index} onClick={handleChangeCover}>
                <Image
                  src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                  alt={cover}
                  className={`rounded h-32 w-24 object-cover relative z-10 group-hover:opacity-70 transition-opacity`}
                  width={128}
                  height={96}
                />
              </button>
            );
          })
        ) : (
          placeholderBooks
        )}
      </div>
    </ScrollArea>
  );
}

