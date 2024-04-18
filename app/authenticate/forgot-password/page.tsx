import { ButtonSubmit } from "@/components/ButtonSubmit";
import NavBack from "@/components/NavBack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function page({ searchParams }: { searchParams: any }) {
  const sendResetEmail = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_HOST}/authenticate/reset-password`,
    });

    if (error) {
      return redirect(
        "/authenticate/forgot-password?message=Could not send password reset email."
      );
    }

    if (!error) {
      return redirect(
        "/authenticate/forgot-password?message=Password reset email sent."
      );
    }
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 mb-32 ">
        <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
          Forgot password
        </h1>

        <form className="animate-in flex flex-col w-full justify-center gap-4 relative">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required />

          <ButtonSubmit formAction={sendResetEmail}>
            Send Reset Link
          </ButtonSubmit>
          {searchParams?.message && (
            <p className="p-4 bg-muted-foreground text-muted rounded-lg text-center absolute -bottom-20 w-full">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
