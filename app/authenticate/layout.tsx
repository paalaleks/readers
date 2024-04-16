import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-end xs:pb-0 xs:justify-center flex-1 screenMinHeight -mb-32">
      {children}
    </div>
  );
}
