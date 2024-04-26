import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HomeNav from "./HomeNav";
import ButtonLogin from "./ButtonLogin";
import Image from "next/image";
import classics from "@/public/images/classics.png";

export default function HeroSection() {
  return (
    <>
      <HomeNav>
        <ButtonLogin />
      </HomeNav>
      <header className="relative w-full bg-[url('/images/livingroom.png')] bg-cover bg-no-repeat bg-top min-h-[1400px] grid grid-cols-1 grid-rows-2">
        <div className="max-w-4xl w-full mx-auto px-4 text-center self-center sm:pt-52 pt-24">
          <h1 className="text-[3.4rem] leading-[3.3rem] xs:text-[4rem] xs:leading-[3.8rem] font-bold text-center text-pretty text-primary mb-4 animate-in max-w-4xl px-4">
            Book Okay makes it easy to share libraries and keep track of your
            good books.
          </h1>
          <Button asChild size={"lg"} className="text-lg animate-in mt-3">
            <Link href="/get-labels">
              Get labels to begin
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mr-0 md:mr-8 pt-12">
          <Image
            src={classics}
            alt=""
            className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto"
          />
          <div className="text-center text-primary pb-4 lg:px-0 pt-2 max-w-full md:max-w-lg">
            <h1 className="text-[3.4rem] leading-[3.3rem] xs:text-[4rem] xs:leading-[3.8rem] font-bold text-pretty mb-4 animate-in px-2">
              For the book collector.
            </h1>
            <p className="text-2xl  px-8 ">
              You want to share your best books with friends, but at the same
              time you want your books back again at some point... We will help
              you with that.
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
