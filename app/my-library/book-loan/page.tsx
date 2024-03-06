import { BookLoanAccordion } from "./LibraryCard";

export default function page() {
  return (
    <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3 w-full">
      <BookLoanAccordion />

      {/* <div className="flex flex-col gap-16 items-center border-b border-b-foreground/10 pb-8 w-full">
        <div className="flex flex-col justify-center items-center">Header</div>
      </div> */}
    </div>
  );
}
