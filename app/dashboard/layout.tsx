import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { Provider } from "./Provider";
import { ReactNode } from "react";

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
