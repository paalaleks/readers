import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import AvatarUpload from "@/components/AvatarUpload";
import Username from "@/app/dashboard/settings/Username";
import userServer from "@/hooks/userServer";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: any }) {
  const user = await userServer();

  if (!user)
    redirect(
      "/authenticate/signup?verified=false&message=You need to confirm your email first."
    );

  return (
    <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 mb-24">
      <div className="animate-in flex flex-col w-full justify-center gap-4">
        <h1 className="text-2xl text-center px-4 font-bold leading-7 text-primary">
          Add avatar and username
        </h1>
        <AvatarUpload staticAvatar={null} />

        <Username staticUsername={undefined} staticUserId={user?.id} />
        <Button asChild>
          <Link
            href={`/dashboard/pair-labels?message=Welcome ${user?.email}. You need to pair labels to start using the library app. Remember also to verify your email account.`}
          >
            Continue
          </Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link
            href={`/dashboard/pair-labels?message=Welcome ${user?.email}. You need to pair labels to start using the library app. Remember also to verify your email account.`}
          >
            Skip this for now.
          </Link>
        </Button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}
