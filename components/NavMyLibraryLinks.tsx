"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMyLibraryLinks() {
  const path = usePathname();

  return (
    <ul className="items-center hidden sm:flex">
      <li>
        <Link
          href="/my-library/books"
          className={`p-2 ${
            path === "/my-library/books" ? "opacity-100" : "opacity-50"
          }`}
        >
          Books
        </Link>
      </li>
      <li>
        <Link
          href="/my-library/book-loan"
          className={`p-2 ${
            path === "/my-library/book-loan" ? "opacity-100" : "opacity-50"
          }`}
        >
          Book loan
        </Link>
      </li>
      <li>
        <Link
          href="/my-library/pair-labels"
          className={`p-2 ${
            path === "/my-library/pair-labels" ? "opacity-100" : "opacity-50"
          }`}
        >
          Pair labels
        </Link>
      </li>
      <li>
        <Link
          href="/my-library/settings"
          className={`p-2 ${
            path === "/my-library/settings" ? "opacity-100" : "opacity-50"
          }`}
        >
          Settings
        </Link>
      </li>
    </ul>
  );
}
