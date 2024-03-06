import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import NavBack from "@/components/NavBack";

export default function FormLogin({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data, error: sessionError } = await supabase.auth.getSession();

    const isAdmin = data.session?.user.app_metadata.claims_admin;

    if (error) {
      return redirect("/admin-area/login?message=Could not authenticate user");
    }
    if (sessionError) {
      return redirect("/admin-area/login?message=Could not authenticate user");
    }
    if (isAdmin) {
      return redirect(`/admin-area/${email}`);
    } else if (!isAdmin) {
      return redirect(
        "/admin-area/login?message=You are not an admin. Please sign in with an admin account.",
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <NavBack />
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <ButtonSubmit
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </ButtonSubmit>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
