import Image from "next/image";
import book from "@/public/images/book.png";
import bookmobile from "@/public/images/bookmobile.png";
export default function SectionFindBook() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center pt-24 md:pt-4 pb-8 px-4 sm:px-8">
      <div className="flex items-center flex-col text-primary max-w-md relative z-10 mr-0 md:-mr-40 mb-6 md:mb-40">
        <h2 className="text-3xl sm:text-4xl font-bold  mb-4 relative z-20  text-center whitespace-nowrap">
          Find a book.
        </h2>
        <p className="text-2xl text-center">
          Our users are concerned about not losing their classics, so your
          garanteed to find good books among your friends&apos; book collection.
        </p>
      </div>
      <Image
        alt="Book and label attached to it"
        src={book}
        className="max-w-xl hidden md:block"
      />
      <Image
        alt="Book and label attached to it"
        src={bookmobile}
        className="max-w-lg px-4 xs:px-0 xs:max-w-2xl block md:hidden"
      />
    </section>
  );
}
