"use client";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function FormAddBooks() {
  const placeholderBooks = Array.from({ length: 19 }, (_, index) => (
    <div className="h-32 w-24 bg-muted rounded"></div>
  ));

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
        <div className="flex items-center space-x-2 mt-6">
          <div className="grid flex-1 gap-2">
            <div className="h-32 w-24 bg-muted rounded mx-auto mb-2"></div>
            <Input id="title" placeholder="Title" className="text-center" />
            <Input id="author" placeholder="Author" className="text-center" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="submit" variant="default" className="w-full">
            Add book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
