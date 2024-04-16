"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ToggleBooksLabels() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center w-full">
      <div className=" bg-background h-12 xs:h-8 px-1 my-auto rounded-full ring-1 ring-inset ring-accent xs:max-w-[212px] max-w-[150px] w-full flex justify-center items-center">
        <Link
          href="/dashboard/my-library/books"
          className={`leading-4 text-center flex items-center text-sm px-3 py-1 rounded-3xl ${
            pathname === "/dashboard/my-library/books"
              ? "bg-accent "
              : "opacity-50"
          }`}
        >
          Library view
        </Link>
        <Link
          href="/dashboard/my-library/labels"
          className={`leading-4 text-center flex items-center text-sm px-3 py-1 rounded-3xl ${
            pathname === "/dashboard/my-library/labels"
              ? "bg-accent "
              : "opacity-50"
          }`}
        >
          Labels view
        </Link>
      </div>
    </div>
  );
}
