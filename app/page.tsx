import HeroSection from "./(homepage)/SectionHero";
import SectionRegisterBook from "./(homepage)/SectionRegisterBook";
import SectionBorrowBook from "./(homepage)/SectionBorrowBook";
import SectionFindBook from "./(homepage)/SectionFindBook";
import SectionBlog from "./(homepage)/SectionBlog";

export default async function Index() {
  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto relative bg-background overflow-hidden">
      <HeroSection />
      <SectionRegisterBook />
      <SectionBorrowBook />
      <SectionFindBook />
      <SectionBlog />
    </main>
  );
}
