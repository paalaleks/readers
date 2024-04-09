import HeroSection from "./SectionHero";
import Wrapper from "@/components/Wrapper";
import HowItWorks from "./SectionHowItWorks";
import SectionBlog from "./SectionBlog";
import SectionPhilosophy from "./SectionPhilosophy";

export default async function Index() {
  return (
    <Wrapper>
      <HeroSection />
      <HowItWorks />
      <SectionBlog />
    </Wrapper>
  );
}
