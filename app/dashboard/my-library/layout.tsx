import Wrapper from "@/components/Wrapper";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
