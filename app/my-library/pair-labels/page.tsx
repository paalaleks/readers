import FormPairCode from "./FormPairCode";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;
  const email = data?.user?.email;

  if (searchParams.message === "new-user-created") {
    const createUser = async () => {
      const { error } = await supabase
        .from("myLibrary")
        .upsert([{ user_id: userId, email: email }]);
      if (error) {
        console.error("Error inserting user data into myLibrary:", error);
        return false;
      }
      return true;
    };

    const success = await createUser();
    if (success) {
      return redirect(
        `/my-library/pair-labels?message=Welcome ${data.user?.email} You need to pair labels to start using the library app. Remember also to verify your email account.`,
      );
    } else if (!success) {
      return redirect(`/my-library/pair-labels`);
    }
  }

  return (
    <div className="h-screen flex-1 flex items-center justify-center flex-col max-w-4xl px-3 w-full">
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-6 text-2xl text-center max-w-xs">
            Pair your library labels
          </h1>
          <FormPairCode userId={userId ?? ""} />
        </div>
        {searchParams?.message && (
          <p className="mt-6 p-4 bg-foreground/10 text-foreground text-center w-full max-w-md">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}
