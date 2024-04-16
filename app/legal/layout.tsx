import { ReactNode } from "react";
import NavBack from "@/components/NavBack";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 min-[400px]:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      {children}
    </>
  );
}
