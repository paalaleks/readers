"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function WelcomeMessage({
  searchParams,
  user,
}: {
  searchParams: { message: string };
  user: { id: string; email: string };
}) {
  const supabase = createClient();

  const fetchSupabase = async () => {
    const { data: userData, error: userError } = await supabase
      .from("myLibrary")
      .select("*")
      .eq("user_id", user?.id);

    if (userError) {
      console.error("Error checking if user exists in myLibrary:", userError);
      return redirect("/my-library/books");
    }
    console.log("userdata", userData);

    if (userData.length > 0) {
      return;
    } else {
      const { error } = await supabase
        .from("myLibrary")
        .upsert({ user_id: user?.id, email: user?.email });
      if (error) {
        console.error("Error inserting user in myLibrary:", error);
        return redirect("/my-library/books");
      }
      return redirect(
        `/my-library/pair-labels?message=Welcome ${user?.email}. You need to pair labels to start using the library app. Remember also to verify your email account.`
      );
    }
  };

  if (searchParams?.message === "new-user-created") {
    fetchSupabase();
  }

  return (
    <div>
      {searchParams?.message && (
        <p className="mt-6 p-4 bg-foreground/10 text-foreground text-center w-full max-w-md">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
