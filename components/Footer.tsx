import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#170e08] h-32 flex justify-center items-center leading-5 text-center text-xs absolute bottom-0 left-0 right-0 print:hidden text-muted-foreground">
      <div className="flex flex-wrap items-center justify-center px-4 ">
        <div className="space-x-2 py-2">
          <Link
            href="/legal"
            className="hover:underline underline-offset-2 hover:text-foreground"
          >
            Legal information
          </Link>
          <span>|</span>
          <Link
            href="/contact"
            className="hover:underline underline-offset-2 hover:text-foreground"
          >
            Contact
          </Link>
          <span>|</span>
          <Link
            href="/get-labels"
            className="hover:underline underline-offset-2 hover:text-foreground"
          >
            Get labels
          </Link>
          <span>|</span>
          <Link
            href="/posts"
            className="hover:underline underline-offset-2 hover:text-foreground"
          >
            Blog
          </Link>
        </div>
        <div className="px-4 inline-flex space-x-3 items-center h-4">
          <Link href="https://facebook.com/Homelibrarygeek">
            <Facebook size={16} />
          </Link>
          <Link href="">
            <Instagram size={16} />
          </Link>
          <Link href="https://x.com/bookokaydotapp">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.601"
              height="13"
              viewBox="0 0 13.601 13"
            >
              <path
                id="Icon_simple-x"
                data-name="Icon simple-x"
                d="M10.711,1.73H12.8L8.24,7.237,13.6,14.73H9.4L6.117,10.185,2.355,14.73H.269L5.142,8.839,0,1.73H4.3L7.275,5.884ZM9.98,13.41h1.156L3.676,2.98H2.436Z"
                transform="translate(0 -1.729)"
                fill="#998e86"
              />
            </svg>
          </Link>
        </div>
        <span className="py-2">&copy; 2024 BookOkay. All rights reserved.</span>
      </div>
    </footer>
  );
}
