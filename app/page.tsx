import HeroSection from "./SectionHero";
import Wrapper from "@/components/Wrapper";
import HowItWorks from "./SectionHowItWorks";
import SectionBlog from "./SectionBlog";

export default async function Index() {
  return (
    <Wrapper>
      <HeroSection />
      <HowItWorks />
      <SectionBlog />
    </Wrapper>
  );
}
