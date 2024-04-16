import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <figure className="flex flex-col items-center justify-end xs:pb-0 xs:justify-center flex-1 screenMinHeight -mb-32 bg-[url('/images/livingroom.png')] object-contain bg-no-repeat bg-bottom">
      {children}
    </figure>
  );
}
