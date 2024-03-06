import Footer from "@/components/Footer";
import NavMyLibrary from "@/components/NavMyLibrary";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <>
      <NavMyLibrary />
      <div className="flex-1 w-full flex flex-col items-center mt-8">
        {children}
      </div>
      <Footer />
    </>
  );
}
