import HeroSection from "./(homepage)/SectionHero";
import HowItWorks from "./(homepage)/SectionHowItWorks";
import SectionBlog from "./(homepage)/SectionBlog";
import HomeWrapper from "@/components/HomeWrapper";

export default async function Index() {
  return (
    <HomeWrapper>
      <HeroSection />
      <HowItWorks />
      <SectionBlog />
    </HomeWrapper>
  );
}
