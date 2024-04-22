import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import NavBack from "@/components/NavBack";

export default async function page({ searchParams }: { searchParams: any }) {
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect(
        "/authenticate/signup?message=Could not create user, try again"
      );
    }

    return redirect(
      `/authenticate/signup?verified=false&message=Please check your email to confirm your account.`
    );
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 mb-32">
        {searchParams.verified === "false" ? (
          <div>
            <p className="mt-4 p-4 bg-muted-foreground text-muted rounded-lg text-center">
              {searchParams.message}
            </p>
            <Button asChild className="w-full mt-4">
              <Link href="/authenticate/add-user">Continue</Link>
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
              Creat new user
            </h1>
            <form className="animate-in flex flex-col w-full justify-center gap-4  relative">
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
              <p>
                By signing up you agree to our{" "}
                <Link href={""} className="underline">
                  terms of service
                </Link>
                ,{" "}
                <Link href={""} className="underline">
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link href={""} className="underline">
                  cookie policy
                </Link>
                .
              </p>
              <ButtonSubmit
                formAction={signUp}
                className="mb-2"
                pendingText="Signing Up..."
              >
                Next
              </ButtonSubmit>

              <p className="mx-auto text-center ">
                Already have an account?
                <Link
                  href="/authenticate/login"
                  className="underline underline-offset-2 ml-1 text-primary"
                >
                  Login
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </>
  );
}
