"use client";

import { revalidateHomePath } from "@/app/(homepage)/reavalidateHomePath";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await revalidateHomePath();

    router.push("/");
  };

  return (
    <form
      action={signOut}
      className={`text-muted-foreground hover:text-primary opacity-50 flex justify-start`}
    >
      <button className="flex items-center">
        <span>Logout</span>
      </button>
    </form>
  );
}
