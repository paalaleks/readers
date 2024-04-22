"use client";

import ButtonLogout from "@/components/ButtonLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDashboardLinks() {
  const path = usePathname();

  return (
    <div className="space-y-2 relative z-10 text-lg xs:text-base">
      <Link
        href="/dashboard/all-libraries"
        className={`text-foreground hover:text-primary block ${
          path === "/dashboard/all-libraries"
            ? "opacity-100 text-primary"
            : "opacity-50"
        }`}
      >
        All libraries
      </Link>
      <Link
        href="/dashboard/my-library/books"
        className={`text-foreground hover:text-primary block ${
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
        className={`text-foreground hover:text-primary block ${
          path === "/dashboard/pair-labels"
            ? "opacity-100 text-primary"
            : "opacity-50"
        }`}
      >
        Pair labels
      </Link>
      <Link
        href="/dashboard/settings"
        className={`text-foreground hover:text-primary block ${
          path === "/dashboard/settings"
            ? "opacity-100 text-primary"
            : "opacity-50"
        }`}
      >
        Settings
      </Link>
      <ButtonLogout />
    </div>
  );
}
