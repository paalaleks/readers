import React from "react";

export default function HomeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full max-w-7xl mx-auto relative bg-background nav-content-footer screenMinheight ">
      {children}
    </main>
  );
}
