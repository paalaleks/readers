"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ToggleBooksLabels() {
  const pathname = usePathname();
  return (
    <div className=" bg-background h-8 px-1 m-auto rounded-full ring-1 ring-inset ring-accent max-w-[160px] xs:max-w-52 w-full flex justify-around items-center">
      <Link
        href="/dashboard/my-library/books"
        className={`leading-4 text-center flex items-center text-sm px-4 xs:px-7 py-1 rounded-3xl ${
          pathname === "/dashboard/my-library/books"
            ? "bg-accent "
            : "opacity-50"
        }`}
      >
        Library
      </Link>
      <Link
        href="/dashboard/my-library/labels"
        className={`leading-4 text-center flex items-center text-sm px-4 xs:px-7 py-1 rounded-3xl ${
          pathname === "/dashboard/my-library/labels"
            ? "bg-accent "
            : "opacity-50"
        }`}
      >
        Labels
      </Link>
    </div>
  );
}
