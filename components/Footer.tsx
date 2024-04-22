import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#170e08] h-32 flex justify-center items-center leading-5 text-center text-xs absolute bottom-0 left-0 right-0 print:hidden text-muted-foreground">
      <div className="flex flex-wrap items-center justify-center px-4 space-x-2">
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
        <div className="px-2 inline-flex space-x-3">
          <Link
            href="https://facebook.com/bookokay"
            className="hover:underline underline-offset-2 hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7.442"
              height="14"
              viewBox="0 0 7.442 14"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M126.876,7.816l.386-2.515h-2.413V3.669a1.257,1.257,0,0,1,1.418-1.358h1.1V.17A13.376,13.376,0,0,0,125.417,0a3.07,3.07,0,0,0-3.286,3.384V5.3h-2.209V7.816h2.209v6.079a8.793,8.793,0,0,0,2.718,0V7.816Z"
                transform="translate(-119.922 0)"
                fill="#998e86"
              />
            </svg>
          </Link>
          <Link
            href="https://instagram.com/bookokay"
            className="hover:underline underline-offset-2 hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <g
                id="Group_1"
                data-name="Group 1"
                transform="translate(0 -0.162)"
              >
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M7,.162C5.1.162,4.861.17,4.114.2a5.138,5.138,0,0,0-1.7.325,3.431,3.431,0,0,0-1.24.807,3.431,3.431,0,0,0-.807,1.24,5.138,5.138,0,0,0-.325,1.7C.008,5.022,0,5.26,0,7.162S.008,9.3.042,10.048a5.138,5.138,0,0,0,.325,1.7,3.432,3.432,0,0,0,.807,1.24,3.431,3.431,0,0,0,1.24.807,5.138,5.138,0,0,0,1.7.325c.747.034.985.042,2.886.042s2.139-.008,2.886-.042a5.138,5.138,0,0,0,1.7-.325,3.579,3.579,0,0,0,2.047-2.047,5.138,5.138,0,0,0,.325-1.7C13.992,9.3,14,9.063,14,7.162s-.008-2.139-.042-2.886a5.138,5.138,0,0,0-.325-1.7,3.431,3.431,0,0,0-.807-1.24,3.432,3.432,0,0,0-1.24-.807A5.138,5.138,0,0,0,9.886.2C9.139.17,8.9.162,7,.162ZM7,1.423c1.869,0,2.09.007,2.829.041a3.874,3.874,0,0,1,1.3.241,2.169,2.169,0,0,1,.8.524,2.169,2.169,0,0,1,.524.8,3.873,3.873,0,0,1,.241,1.3c.034.738.041.96.041,2.829s-.007,2.09-.041,2.829a3.873,3.873,0,0,1-.241,1.3,2.318,2.318,0,0,1-1.329,1.329,3.873,3.873,0,0,1-1.3.241c-.738.034-.959.041-2.829.041s-2.091-.007-2.829-.041a3.873,3.873,0,0,1-1.3-.241,2.169,2.169,0,0,1-.8-.524,2.168,2.168,0,0,1-.524-.8A3.873,3.873,0,0,1,1.3,9.99c-.034-.738-.041-.96-.041-2.829s.007-2.09.041-2.829a3.873,3.873,0,0,1,.241-1.3,2.169,2.169,0,0,1,.524-.8,2.169,2.169,0,0,1,.8-.524,3.874,3.874,0,0,1,1.3-.241C4.91,1.43,5.131,1.423,7,1.423Z"
                  transform="translate(0)"
                  fill="#998e86"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M128.215,130.762a2.385,2.385,0,1,1,2.385-2.385A2.385,2.385,0,0,1,128.215,130.762Zm0-6.06a3.675,3.675,0,1,0,3.675,3.675A3.675,3.675,0,0,0,128.215,124.7Z"
                  transform="translate(-121.215 -121.215)"
                  fill="#998e86"
                />
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M364.313,89.979a1.19,1.19,0,1,1-1.19-1.19A1.19,1.19,0,0,1,364.313,89.979Z"
                  transform="translate(-352.598 -86.341)"
                  fill="#998e86"
                />
              </g>
            </svg>
          </Link>
        </div>
        <span>&copy; 2024 BookOkay. All rights reserved.</span>
      </div>
    </footer>
  );
}
