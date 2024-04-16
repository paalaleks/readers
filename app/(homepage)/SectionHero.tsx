import React from "react";
import Nav from "../../components/Nav";
import NavHomeLinks from "./NavHomeLinks";
import ButtonLogin from "@/app/(homepage)/ButtonLogin";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <Nav
        children1={<ButtonLogin />}
        children2={<NavHomeLinks />}
        styles="w-96 bg-transparent border-none shadow-none ml-0 pl-4 xs:-ml-4"
      />
      <header className="flex flex-col items-center justify-end pb-4 xs:pb-0 xs:justify-center flex-1 screenMinHeight -mt-24 bg-[url('/images/livingroom.png')] bg-cover bg-no-repeat bg-bottom">
        <h1 className="text-[3.5rem] leading-[3.4rem] xs:text-[4rem] xs:leading-[3.8rem] font-bold text-center text-pretty text-primary mb-4 animate-in max-w-4xl px-4">
          Book Okay makes it easy to share libraries and keep track of your good
          books.
        </h1>
        <Button asChild size={"lg"} className="text-lg animate-in mt-3">
          <Link href="/get-labels">
            Get labels to begin
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </header>
    </>
  );
}
