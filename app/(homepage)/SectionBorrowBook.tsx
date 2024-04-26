import Image from "next/image";
import mobilescan from "@/public/images/mobilescan.png";

export default function SectionBorrowBook() {
  return (
    <section className=" animate-fade-in min-h-[37.5rem] flex relative max-w-4xl w-full mx-auto -mt-8">
      <div className="bg-[url('/images/table.png')] bg-cover w-full absolute h-full bg-no-repeat z-10 bg-left-bottom">
        <div className="right-0 sm:right-12 px-8 top-2/3 md:top-1/2 absolute text-center z-20 text-primary">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 whitespace-nowrap">
            Borrow a book.
          </h2>
          <p className="text-2xl z-30 max-w-md">
            Borrow a book by scanning the label attached to the book. And just
            send the email that pops up. Now you have confirmed the book is
            borrowed.
          </p>
          <br />
        </div>
        <Image
          alt="Hand scaning book qr-label"
          src={mobilescan}
          className="absolute z-10 -left-16 top-28 animate-fade-in max-w-[29rem] w-full"
        />
      </div>
    </section>
  );
}
