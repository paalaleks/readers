import ButtonLogin from "./ButtonLogin";
import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 px-2">
      <div className="w-full max-w-4xl relative flex justify-end items-center text-sm">
        <Logo />
        <ul className="flex items-center">
          <li>
            <button className="p-2">Library Card</button>
          </li>
          <li>
            <Link href="/library-labels" className="p-2">
              Library labels
            </Link>
          </li>
          <li className="">
            <ButtonLogin />
          </li>
        </ul>
      </div>
    </nav>
  );
}
