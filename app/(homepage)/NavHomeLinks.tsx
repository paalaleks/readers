import Link from "next/link";

export default function NavHomeLinks() {
  return (
    <div className="relative z-10 items-center space-x-4">
      <Link
        href="/posts"
        className={`text-primary hover:text-primary hover: brightness-110 hover:underline underline-offset-4 text-lg`}
      >
        Blog
      </Link>
      <Link
        href="/contact"
        className={`text-primary hover:text-primary hover: brightness-110 hover:underline underline-offset-4 text-lg`}
      >
        Contact
      </Link>
      <Link
        href="/get-labels"
        className={`text-primary hover:text-primary  hover: brightness-110 hover:underline underline-offset-4 text-lg`}
      >
        Get labels
      </Link>
    </div>
  );
}
