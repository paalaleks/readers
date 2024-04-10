import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col max-w-[1536px] w-full mx-auto relative bg-background h-full min-h-screen nav-content-footer">
      {children}
    </main>
  );
}
