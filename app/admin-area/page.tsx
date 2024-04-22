import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userLoggedIn = session?.user;

  if (!userLoggedIn) {
    redirect("authenticate/login");
  }
  if (userLoggedIn) {
    redirect(`admin-area/${userLoggedIn.email}`);
  }
  return <div>redirecting...</div>;
}
