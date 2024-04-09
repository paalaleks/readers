import Image from "next/image";
import React from "react";
import scanHand from "../public/images/mobilescan.png";
import labelsAndBooks from "../public/images/labelsAndBooks.png";

export default function HowItWorks() {
  return (
    <div className="max-w-8xl mx-auto w-full bg-[#1C130E] h-full">
      <section className="z-10 relative animate-fade-in min-h-60 flex items-center flex-col sm:flex-row pt-4 pb-6  max-w-4xl w-full mx-auto">
        <div className=" pl-8 pr-4 w-full flex items-center flex-col">
          <h3 className="text-lg sm:text-xl whitespace-nowrap text-primary pb-4">
            How it works:
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary/90 mb-4 relative z-20 whitespace-nowrap text-center">
            Register a book
          </h2>
          <p className="text-2xl max-w-md max-w-[400px]:pb-0 pb-4 text-center text-primary/90">
            Attach a label and register the book it's attached to inside the
            app.
          </p>
        </div>
        <Image
          alt="Hand scaning book qr-label"
          src={labelsAndBooks}
          className=" z-10 animate-fade-in max-w-xl w-full mt-auto px-4"
        />
      </section>
      <section className=" animate-fade-in min-h-[600px] flex relative -mt-12  max-w-5xl w-full mx-auto">
        <div className="bg-[url('/images/table.svg')] bg-cover w-full absolute h-full bg-no-repeat z-10 bg-left-bottom">
          <div className="right-0 sm:right-12 px-8 top-[60%] md:top-[40%] absolute text-center z-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 whitespace-nowrap">
              Borrow a book
            </h2>
            <p className="text-2xl z-30 max-w-md">
              Borrow a book by scanning the label attached to the book. And just
              send the email that pops up.
            </p>
            <br />
          </div>
          <Image
            alt="Hand scaning book qr-label"
            src={scanHand}
            className="absolute z-10 left-0 top-20 animate-fade-in max-w-[425px]"
          />
        </div>
      </section>

      <section className="animate-fade-in w-full text-center relative flex flex-col items-center justify-start ">
        <div className=" flex flex-col justify-start items-center object-contain  text-primary bg-[url('/images/book.png')] h-[490px] bg-no-repeat bg-center bg-cover w-full max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 whitespace-nowrap text-center pt-8 sm:pt-12">
            Find a book
          </h2>
          <p className="text-2xl z-30 max-w-md px-8">
            Most of our users are consered about not losing classic reads. So
            your garanteed to find good books in your friends book collection.
          </p>
        </div>
      </section>
    </div>
  );
}
