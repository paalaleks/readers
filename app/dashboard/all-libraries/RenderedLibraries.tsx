"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Book, FriendLibrary } from "@/types/project.types";
import * as RadixPopover from "@radix-ui/react-popover";
import { BookUser } from "lucide-react";
import { borrowRequest } from "../settings/MutateMessages";

export default function RenderedLibraries({
  staticFriendLibraries,
}: {
  staticFriendLibraries: FriendLibrary[];
}) {
  const [selectedBookUrl, setSelectedBookUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleOpenChange = (open: boolean, bookUrl: string) => {
    if (open) {
      setSelectedBookUrl(bookUrl);
    } else {
      setSelectedBookUrl(null);
    }
  };

  const handleBorrowRequest = async (book: Book, lib: FriendLibrary) => {
    const mailtoHref = await borrowRequest(book, lib);
    if (mailtoHref) {
      window.location.href = mailtoHref;
    }
  };

  return staticFriendLibraries.map((lib) => (
    <Card
      key={lib.user_id}
      className="shadow-md border-accent bg-background rounded-xl"
    >
      <div className="flex flex-row items-center p-6">
        <Image
          className="h-12 w-12 rounded-full object-cover bg-background "
          alt="avatar"
          src={lib.avatar || "/images/avatar-circle.svg"}
          height={128}
          width={128}
        />
        <h2 className="pl-2 text-primary/70">{lib.username || lib.email}</h2>
      </div>
      <CardContent className="flex flex-col items-center w-full mx-auto">
        <div className="grid gap-x-2 gap-y-2 grid-cols-2 min-[425px]:grid-cols-3 min-[500px]:grid-cols-4 sm:grid-cols-5 pb-8 ">
          {lib.books && lib.books.length > 0 ? (
            lib.books.map((book, index) => {
              if (book.status === "DELETED")
                return (
                  <div className="hidden" key={`${book.url}-${index}`}></div>
                );
              return (
                <article className="h-full w-24 " key={`${book.url}-${index}`}>
                  <RadixPopover.Root
                    onOpenChange={(e) => handleOpenChange(e, book.url || "")}
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
                      <span className="font-bold">{book?.title}</span>
                      <br />
                      <span suppressContentEditableWarning contentEditable>
                        {book?.author}
                      </span>
                    </p>
                    <RadixPopover.Content className="absolute top-0 left-0 bg-background z-10  focus:outline-none">
                      <div className="w-24 h-32 rounded border border-accent flex justify-center flex-col items-center">
                        <button
                          onClick={() => handleBorrowRequest(book, lib)}
                          className="flex justify-center flex-col items-center outline-none text-center"
                        >
                          <BookUser size={16} />
                          <span className="leading-3 mt-2 text-xs">
                            Request to borrow
                          </span>
                        </button>
                      </div>
                    </RadixPopover.Content>
                  </RadixPopover.Root>
                </article>
              );
            })
          ) : (
            <p className="text-sm leading-4">No books available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  ));
}
