"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";
import Autocomplete from "./Autocomplete";
import { createClient } from "@/utils/supabase/client";
import { Json } from "@/types/project.types";
import { useSearchParams } from "next/navigation";
import { useProvider } from "../../Provider";
import useUser from "@/hooks/useUser";
import { revalidateBooksPath } from "../(sa)/revalidatePage";

export default function AddBooks() {
  const [toggleManually, setToggleManually] = useState<boolean>(false);
  const [toggleCoverSelection, setToggleCoverSelection] = useState<boolean>(
    false
  );
  const { open, setOpen, selectedBook, setSelectedBook } = useProvider();
  const supabase = createClient();
  const { userId } = useUser();

  const handleToggleManually = () => {
    setToggleManually(!toggleManually);
  };

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
        <div className="flex justify-center w-[52px]">
          <button
            className={`flex items-center justify-center text-sm transition-colors ease-in-out w-8 h-8 text-primary-foreground bg-primary/80 hover:bg-primary/100 rounded-full `}
          >
            <Plus size={18} className="" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md round">
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
          <div className={`${toggleManually ? `hidden` : `visible`}`}>
            <Autocomplete open={open} />
          </div>

          <div
            id="enter-manually"
            className={`${toggleManually ? `visible` : `hidden`}`}
          >
            <div className="h-32 w-24 bg-muted rounded mx-auto mb-4 relative"></div>
            <Input id="title" placeholder="Title" className=" mb-2" />
            <Input id="author" placeholder="Author" className="" />
          </div>
          {!toggleCoverSelection && (
            <Button
              type="submit"
              variant="ghost"
              className="w-full bg-muted text-foreground mt-1"
            >
              Add book
            </Button>
          )}
        </form>

        {!toggleCoverSelection && (
          <button
            className={`mb-1 text-sm text-muted-foreground`}
            onClick={handleToggleManually}
          >
            {toggleManually
              ? "Register with autocompletion?"
              : "Register manually instead?"}
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
