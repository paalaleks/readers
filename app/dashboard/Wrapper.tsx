import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col w-full max-w-5xl mx-auto relative bg-background nav-content-footer screenMinheight ">
      {children}
    </main>
  );
}
