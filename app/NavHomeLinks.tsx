"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavHomeLinks() {
  const path = usePathname();

  return (
    <div className="relative z-10 text-primary items-center inline-flex border border-b-2 border-s-0 border-e-0 border-t-0 border-primary/30 pb-4 space-x-4">
      <Link
        href="/blog"
        className={`text-primary hover:text-primary hover: brightness-110  ${
          path === "/dashboard/all-libraries"
            ? "opacity-100 text-primary"
            : "opacity-100"
        }`}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={`text-primary hover:text-primary hover: brightness-110  ${
          path === "/dashboard/all-libraries"
            ? "opacity-100 text-primary"
            : "opacity-100"
        }`}
      >
        About
      </Link>
      <Link
        href="/get-in-touch"
        className={`text-primary hover:text-primary hover: brightness-110  ${
          path === "/dashboard/all-libraries"
            ? "opacity-100 text-primary"
            : "opacity-100"
        }`}
      >
        Contact
      </Link>
      <Link
        href="/Buy-labels"
        className={`text-primary hover:text-primary  hover: brightness-110 ${
          path === "/dashboard/all-libraries"
            ? "opacity-100 text-primary"
            : "opacity-100"
        }`}
      >
        Get labels
      </Link>
    </div>
  );
}
