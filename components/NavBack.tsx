import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NavBack() {
  return (
    <Link
      href="/"
      className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    >
      <ArrowLeft className="mr-2" size={16} />
      Back
    </Link>
  );
}
