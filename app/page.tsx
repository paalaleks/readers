import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default async function Index() {
  return (
    <>
      <Nav />
      <div className="animate-in flex-1 flex flex-col mt-8 opacity-0 max-w-4xl px-3 ">
        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 justify-center items-center">
            Header here
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
