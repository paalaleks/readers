"use client";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function FormAddBooks() {
  const placeholderBooks = Array.from({ length: 19 }, (_, index) => (
    <div className="h-32 w-24 bg-muted rounded"></div>
  ));

  const [toggleManually, setToggleManually] = useState<boolean>(false);
  const handleToggleManually = () => {
    setToggleManually(!toggleManually);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Dialog>
      <div className="grid gap-4 grid-cols-4">
        <DialogTrigger
          asChild
          className="flex items-center justify-center h-full w-full border-2 border-muted rounded-md"
        >
          <button>
            <Plus size={32} className="text-foreground" />
          </button>
        </DialogTrigger>
        {placeholderBooks}
      </div>

      <DialogContent className="max-w-xs">
        <div className="flex items-center mt-6">
          <div className="grid flex-1 gap-2">
            <div className="h-32 w-24 bg-muted rounded mx-auto mb-2"></div>
            <Input
              id="title-or-author"
              placeholder={`Title or author`}
              className={`text-center ${toggleManually ? `hidden` : `visible`}`}
              onFocus={(e) => {
                if (e.currentTarget.value.length > 0) {
                  setToggleManually(true);
                } else {
                  setToggleManually(false);
                }
              }}
            />
            <div
              id="enter-manually"
              className={`${toggleManually ? `visible` : `hidden`}`}
            >
              <Input
                id="title"
                placeholder="Title"
                className="text-center mb-2"
              />
              <Input id="author" placeholder="Author" className="text-center" />
            </div>
          </div>
        </div>

        <Button type="submit" variant="default" className="w-full">
          Add book
        </Button>
        <button
          className={`text-center mt-1 mb-1 text-sm`}
          onClick={handleToggleManually}
        >
          {toggleManually
            ? "Register with autocompletion?"
            : "Register manually instead?"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
