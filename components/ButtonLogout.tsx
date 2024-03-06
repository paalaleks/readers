import { createClient } from "@/utils/supabase/server";
import { Power } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ButtonLogout() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <form action={signOut}>
      <button className="m-2">
        <Power size={16} />
      </button>
    </form>
  );
}
