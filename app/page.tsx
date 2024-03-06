import { createClient } from "@/utils/supabase/server";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default async function Index() {
  const supabase = createClient();

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      console.log(session?.user.app_metadata); // show custom claims
    }
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Nav />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 justify-center items-center">
            Header here
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
