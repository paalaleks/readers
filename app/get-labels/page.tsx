"use client";

import NavBack from "@/components/NavBack";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { handleNewsletterSignup } from "./collectEmail";

export default function Page() {
  return (
    <main className="screenMinHeight nav-content-footer flex flex-col justify-center items-center max-w-5xl mx-auto">
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 w-full">
        <NavBack />
      </nav>
      <form className="animate-in flex flex-col justify-center items-center gap-4 px-4 sm:px-8 flex-1 max-w-sm">
        <h1 className="text-3xl text-center text-primary px-4">
          Leave your email
        </h1>

        <p className="text-center">
          At this point we only have
          <Link href="/contact" className="mx-1 underline text-primary">
            demo labels
          </Link>
          , but be sure to leave your email and you&apos;ll get notified when
          labels are ready for sale.
        </p>
        <Input required name="email" type="email" autoFocus />
        <ButtonSubmit
          type="submit"
          formAction={handleNewsletterSignup}
          className="w-full max-w-sm"
        >
          Sign me up !
        </ButtonSubmit>
      </form>
    </main>
  );
}
