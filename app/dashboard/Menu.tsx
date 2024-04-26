"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonLogout from "@/components/ButtonLogout";

export default function Menu() {
  const [open, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  const path = usePathname();

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className={`absolute left-4 top-4 xs:left-8 flex flex-row justify-center items-center h-16 z-10 hover:text-primary/100 transition-colors ease-in-out ${
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

      <PopoverContent
        align="start"
        className={`w-40 pl-8 -ml-5 bg-background border border-accent rounded-xl py-6 mt-2 sh`}
      >
        <div className="space-y-2 relative z-10 ">
          <Link
            href="/dashboard/all-libraries"
            className={`text-muted-foreground hover:text-primary block ${
              path === "/dashboard/all-libraries"
                ? "opacity-100 text-primary"
                : "opacity-50"
            }`}
          >
            All libraries
          </Link>
          <Link
            href="/dashboard/my-library/books"
            className={`text-muted-foreground hover:text-primary block ${
              path === "/dashboard/my-library/books" ||
              path === "/dashboard/my-library/labels"
                ? "opacity-100 text-primary"
                : "opacity-50"
            }`}
          >
            My library
          </Link>
          <Link
            href="/dashboard/pair-labels"
            className={`text-muted-foreground hover:text-primary block ${
              path === "/dashboard/pair-labels"
                ? "opacity-100 text-primary"
                : "opacity-50"
            }`}
          >
            Pair labels
          </Link>
          <Link
            href="/dashboard/settings"
            className={`text-muted-foreground hover:text-primary block ${
              path === "/dashboard/settings"
                ? "opacity-100 text-primary"
                : "opacity-50"
            }`}
          >
            Settings
          </Link>
          <ButtonLogout />
        </div>
      </PopoverContent>
    </Popover>
  );
}
