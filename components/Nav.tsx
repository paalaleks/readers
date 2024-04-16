"use client";

import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function Nav({
  styles,
  children1,
  children2,
}: {
  styles: string;
  children1: ReactNode;
  children2: ReactNode;
}) {
  const [open, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 max-w-5xl w-full mx-auto">
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger
          className={`flex flex-row justify-center items-center h-16 relative z-10 hover:text-primary/100 transition-colors ease-in-out ${
            open ? "text-primary/100" : "text-primary/80"
          }`}
        >
          <h2 className="text-center text-lg leading-[1.2rem] uppercase">
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

        <PopoverContent align="start" className={`${styles}`}>
          {children2}
        </PopoverContent>
      </Popover>
      {children1}
    </nav>
  );
}
