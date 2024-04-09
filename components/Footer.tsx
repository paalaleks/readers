import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black h-28 flex justify-center items-center leading-5 text-center text-xs absolute bottom-0 left-0 right-0 print:hidden text-muted-foreground">
      <div className="flex flex-wrap items-center justify-center px-4">
        <span className="">
          Book search is powered by
          <Link
            href="http://www.openlibrary.org"
            className="hover:underline hover:text-foreground ml-1"
            rel="noreferrer"
            target="_blank"
          >
            openlibrary.org
          </Link>
        </span>
        <span className="mx-2">|</span>
        <span>
          <Link
            href="/privacy"
            className="hover:underline hover:text-foreground"
          >
            Privacy policy
          </Link>
        </span>
        <span className="mx-2">|</span>
        <span>
          <Link
            href="/privacy"
            className="hover:underline hover:text-foreground"
          >
            Cookie policy
          </Link>
        </span>
        <span className="mx-2">|</span>
        <span>
          <Link href="/help" className="hover:underline hover:text-foreground">
            Need help ?
          </Link>
        </span>
        <span className="mx-2">|</span>
        <span>&copy; 2024 BookOkay. All rights reserved.</span>
      </div>
    </footer>
  );
}
