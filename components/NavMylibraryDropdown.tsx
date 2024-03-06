import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ButtonLogout from "@/components/ButtonLogout";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

export default function NavMylibraryDropdown() {
  return (
    <Popover>
      <PopoverTrigger className="flex rounded-full mr-1 sm:hidden p-1">
        <Menu size={18} className="" />
      </PopoverTrigger>
      <PopoverContent className="w-32 mt-4 bg-muted-foreground text-foreground border-none sm:hidden block">
        <ul className="space-y-2 text-center">
          <li>
            <Link href="/my-library/books">Books</Link>
          </li>
          <li>
            <Link href="/my-library/book-loan">Book loan</Link>
          </li>
          <li>
            <Link href="/my-library/pair-labels">Pair labels</Link>
          </li>
          <li>
            <Link href="/my-library/settings">Settings</Link>
          </li>
          <li>
            <ButtonLogout />
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
