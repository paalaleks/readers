"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, ReactNode } from "react";
import Link from "next/link";

export default function HomeNav({ children }: { children: ReactNode }) {
  const [open, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 lg:px-12 z-10 max-w-6xl mx-auto w-full absolute">
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger
          className={`flex flex-row justify-center items-center h-16 relative z-10 hover:text-primary/100 transition-colors ease-in-out ${
            open ? "text-primary/100" : "text-primary/80"
          }`}
        >
          <h2 className="text-center text-lg leading-[1.2rem] md:text-2xl md:leading-6 uppercase">
            Book <br />
            Okay
          </h2>
          {open && (
            <div className="flex flex-col space-y-1 absolute -right-3">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </PopoverTrigger>

        <PopoverContent
          side="right"
          className={`w-96 bg-transparent border-none shadow-none -ml-16 sm:ml-6 mt-20 sm:mt-0`}
        >
          <div className="relative z-10 items-center flex space-x-6">
            <Link
              href="/posts"
              className={`text-primary/80 hover:text-primary hover:underline underline-offset-4`}
            >
              <h2>Blog</h2>
            </Link>
            <Link
              href="/contact"
              className={`text-primary/80 hover:text-primary hover:underline underline-offset-4`}
            >
              <h2>Contact</h2>
            </Link>
            <Link
              href="/get-labels"
              className={`text-primary/80 hover:text-primary  hover:underline underline-offset-4`}
            >
              <h2>Get labels</h2>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
      {children}
    </nav>
  );
}
