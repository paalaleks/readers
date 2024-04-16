import HeroSection from "./(homepage)/SectionHero";
import Wrapper from "@/components/Wrapper";
import HowItWorks from "./(homepage)/SectionHowItWorks";
import SectionBlog from "./(homepage)/SectionBlog";

export default async function Index() {
  return (
    <Wrapper>
      <HeroSection />
      <HowItWorks />
      <SectionBlog />
    </Wrapper>
  );
}
