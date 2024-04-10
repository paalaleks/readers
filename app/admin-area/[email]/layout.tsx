import React from "react";
import { createClient } from "@/utils/supabase/server";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { email: string };
}) {
  // login check
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const decodedEmail = decodeURIComponent(params.email);

  if (decodedEmail !== data?.session?.user.email) {
    return (
      <div className="h-screen flex items-center flex-col w-full justify-center">
        Oops, invalid email or not logged in
      </div>
    );
  } else if (data.session)
    return (
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    );
}
