import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import NavBack from "@/components/NavBack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({
  searchParams,
}: {
  searchParams: {
    action: string;
    message: string;
    user_id: string;
  };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard/my-library/books");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    const messages = {
      qrSubject:
        'Borrowing <span class="inserted-text">book title</span> via book okay 📚👍',
      qrMessage:
        'Thanks for lending me "<span class="inserted-text">book title</span>" by <span class="inserted-text">book author</span>! Contact me when you need it back! 📚👋',
      libSubject:
        'Interest in borrowing: <span class="inserted-text">book title</span>',
      libMessage:
        'Hello <span class="inserted-text">owner name</span>, I am interested in borrowing "<span class="inserted-text">book title</span> by <span class="inserted-text">book author</span>. Could you let me know if it\'s available? Thank you!',
    };

    const { error: myLibraryError } = await supabase.from("myLibrary").upsert({
      user_id: data.user?.id,
      email,
      messages: messages,
    });
    if (myLibraryError) {
      console.error("Error inserting user in myLibrary:", myLibraryError);
      return redirect(
        "/login?message=Problems creating the user, please try again."
      );
    }

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect(`/login/add-image-and-username`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-32">
      <nav className="flex flex-row justify-between items-center w-full h-32 px-8 max-w-4xl mx-auto">
        <NavBack />
      </nav>

      <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 gap-8">
        <h1 className="text-2xl text-center flex-0 px-4 font-bold">
          {searchParams?.action === "create-user"
            ? "Creat new user"
            : "Login to app"}
        </h1>

        <form className="animate-in flex flex-col w-full justify-center gap-2 ">
          <Label className="" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className=""
            name="email"
            placeholder="you@example.com"
            required
          />
          <Label className="" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="mb-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />

          {searchParams?.action === "create-user" ? (
            <ButtonSubmit
              formAction={signUp}
              className="mb-2"
              pendingText="Signing Up..."
            >
              Next
            </ButtonSubmit>
          ) : (
            <ButtonSubmit
              formAction={signIn}
              className="mb-2"
              pendingText="Signing In..."
            >
              Login
            </ButtonSubmit>
          )}

          {searchParams?.action === "create-user" ? (
            <p className="mx-auto text-center mt-4">
              Do you already have an account? <br />
              <Link href="/login?action=login-user" className="underline">
                Login to your account
              </Link>
            </p>
          ) : (
            <p className="mx-auto text-center mt-4">
              Do you need to create an account? <br />
              <Link href="/login?action=create-user" className="underline">
                Create a new account
              </Link>
            </p>
          )}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
