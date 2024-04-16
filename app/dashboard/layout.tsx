import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { Provider } from "./Provider";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Okay - Dashboard",
  description:
    "Book Okay makes it easy to share libraries and keep track of your good books. Memebers area: All libraries, My library, Pair labels, Settings.",
};

export default async function layout({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return <Provider>{children}</Provider>;
}
