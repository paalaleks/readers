import NavBack from "@/components/NavBack";

export default function page() {
  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 min-[25rem]:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 "></div>
    </>
  );
}
