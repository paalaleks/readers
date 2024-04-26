"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, FormEvent } from "react";
import Autocomplete from "./Autocomplete";
import { createClient } from "@/utils/supabase/client";
import { Json } from "@/types/project.types";
import { useSearchParams } from "next/navigation";
import { useProvider } from "../../Provider";
import useUser from "@/hooks/useUser";
import { revalidateBooksPath } from "../(sa)/revalidatePage";

export default function AddBooks() {
  const [toggleCoverSelection, setToggleCoverSelection] = useState<boolean>(
    false
  );
  const { open, setOpen, selectedBook, setSelectedBook } = useProvider();
  const supabase = createClient();
  const { userId } = useUser();

  async function fetchUserLibrary(userId: string) {
    const { data, error } = await supabase
      .from("myLibrary")
      .select("books, codeSeries")
      .eq("user_id", userId)
      .single();

    revalidateBooksPath();
    return { data, error };
  }

  async function updateLibrary(userId: string, newBooks: Json) {
    const { data, error } = await supabase
      .from("myLibrary")
      .update({ books: newBooks })
      .eq("user_id", userId);

    return { data, error };
  }
  const searchParams = useSearchParams();
  const selectedBookUrl = searchParams.get("slot");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBook || !userId) return;

    const { data: userLibrary, error: fetchError } = await fetchUserLibrary(
      userId
    );

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    let updatedBooksArray = userLibrary?.books ? [...userLibrary.books] : [];

    const deletedBookIndex = updatedBooksArray.findIndex(
      (book) => book.status === "DELETED" && book.url === selectedBookUrl
    );

    if (deletedBookIndex !== -1) {
      updatedBooksArray[deletedBookIndex] = {
        ...selectedBook,
        url: updatedBooksArray[deletedBookIndex].url,
        status: undefined,
      };
    } else {
      const allCodes = userLibrary?.codeSeries.map(
        (codeObj: { code: any }) => codeObj.code
      );
      const usedCodes = updatedBooksArray.map((book) => book.url);
      const unusedCode = allCodes?.find(
        (code: any) => !usedCodes.includes(code)
      );

      if (!unusedCode) {
        console.error("No unused codes available");
        return;
      }

      updatedBooksArray.push({
        ...selectedBook,
        url: unusedCode,
        status: undefined,
      });
    }

    const { error: updateError } = await updateLibrary(
      userId,
      updatedBooksArray
    );

    if (updateError) {
      console.error(updateError);
    } else {
      setOpen(false);
      setSelectedBook(null);
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("message", "Success!");
      window.history.pushState({}, "", currentUrl.toString());
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      window.history.pushState({}, "", window.location.pathname);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex justify-center absolute xs:right-8 right-4 top-8">
          <button
            className={`flex items-center justify-center text-sm transition-colors ease-in-out w-8 h-8 text-primary-foreground bg-primary/80 hover:bg-primary/100 rounded-full `}
          >
            <Plus size={18} className="" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md -translate-y-3/4 xs:-translate-y-1/2">
        {toggleCoverSelection && (
          <button
            onClick={() => setToggleCoverSelection(!toggleCoverSelection)}
          >
            <ArrowLeft
              size={16}
              className="absolute top-4 left-4 text-muted-foreground
               rounded-sm opacity-70 transition-opacity hover:opacity-100"
            />
          </button>
        )}

        <form className="grid mt-6 flex-1 gap-2" onSubmit={handleSubmit}>
          <Autocomplete open={open} />

          {!toggleCoverSelection && (
            <Button
              type="submit"
              variant="secondary"
              className="w-full bg-muted text-foreground mt-1"
            >
              Add book
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

