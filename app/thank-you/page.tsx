import NavBack from "@/components/NavBack";

export default function page() {
  return (
    <main className="screenMinHeight nav-content-footer flex flex-col justify-center items-center max-w-5xl mx-auto">
      <nav className="flex flex-row justify-between items-center h-24 px-4 min-[400px]:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>

      <div className="animate-in flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
        <h1 className="text-3xl text-center text-primary px-4 font-bold">
          Thanks! You will hear from us soon.
        </h1>
      </div>
    </main>
  );
}
