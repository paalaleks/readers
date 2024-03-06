import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function BookLoanAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Library Card</AccordionTrigger>
        <AccordionContent>
          <div>
            <p>
              A library card is a card that is used to borrow books from the
              library. It is a personal identification card that is used to
              borrow books and other materials from the library. The card
              contains the name of the library user, the library card number,
              and the expiration date of the card. The library card is used to
              borrow books, CDs, DVDs, and other materials from the library.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Books in</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Books out</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
