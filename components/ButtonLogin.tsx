import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
export default async function ButtonLogin() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <Link
      href="/my-library"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover tex-sm"
    >
      My Library
    </Link>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover tex-sm"
    >
      Login
    </Link>
  );
}
