import { ButtonSubmit } from "@/components/ButtonSubmit";
import NavBack from "@/components/NavBack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function page({ searchParams }: { searchParams: any }) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(
        "/authenticate/login?message=Could not authenticate user"
      );
    }

    return redirect("/dashboard/my-library/books");
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 mb-32">
        <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
          Login
        </h1>

        <form className="animate-in flex flex-col w-full justify-center gap-4 ">
          <Label className="" htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            className=""
            name="email"
            placeholder="you@example.com"
            required
          />
          <div className="inline-flex items-center">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Link
              href="/authenticate/forgot-password"
              className="underline underline-offset-2 text-sm ml-auto"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            className="mb-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <ButtonSubmit
            formAction={signIn}
            className="mb-2"
            pendingText="Signing In..."
          >
            Login
          </ButtonSubmit>
          <p className="mx-auto text-center ">
            Don&apos;t have an account?
            <Link
              href="/authenticate/signup"
              className="underline underline-offset-2 ml-1 text-primary"
            >
              Sign up
            </Link>
          </p>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-muted-foreground text-muted rounded-lg text-center absolute -bottom-28">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
