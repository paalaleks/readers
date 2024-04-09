import React from "react";
import Nav from "./Nav";
import NavHomeLinks from "./NavHomeLinks";
import ButtonLogin from "@/app/ButtonLogin";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <Nav
        children1={<ButtonLogin />}
        children2={<NavHomeLinks />}
        styles="w-96 bg-transparent border-none shadow-none ml-0 pl-4 min-[400px]:-ml-4"
      />
      <header className="flex flex-col items-center justify-end pb-14 min-[400px]:pb-0 min-[400px]:justify-center flex-1 min-h-screen -mt-24 bg-[url('/images/livingroom.png')] object-contain bg-no-repeat bg-bottom">
        <h1 className=" text-6xl leading-[3.7rem] sm:text-7xl sm:leading-[4rem] font-bold text-center text-pretty text-primary mb-4 animate-in max-w-4xl px-4">
          Book Okay makes it easy to share libraries and keep track of your good
          books.
        </h1>
        <Button size={"lg"} className="text-lg animate-in mt-6">
          Get labels to begin
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </header>
    </>
  );
}
