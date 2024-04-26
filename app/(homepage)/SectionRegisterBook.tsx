import Image from "next/image";
import product from "@/public/images/product.png";
import productmobile from "@/public/images/productmobile.png";
export default function SectionRegisterBook() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center pt-32 md:pt-24 px-4 sm:px-8">
      <div className="flex items-center flex-col text-primary max-w-md relative z-10 mr-0 md:-mr-40 -mb-4 ml-0 md:ml-8">
        <h3 className="text-lg sm:text-xl whitespace-nowrap absolute -mt-12 md:-mt-16 ">
          How it works:
        </h3>
        <h2 className="text-3xl sm:text-4xl font-bold  mb-4 relative z-20  text-center whitespace-nowrap">
          Register a book.
        </h2>
        <p className="text-2xl text-center">
          Attach a label and register the book it&apos;s attached to.
        </p>
      </div>
      <Image
        alt="Book and label attached to it"
        src={product}
        className="max-w-2xl hidden md:block"
      />
      <Image
        alt="Book and label attached to it"
        src={productmobile}
        className="max-w-lg px-4 xs:px-0 xs:max-w-2xl block md:hidden"
      />
    </section>
  );
}
