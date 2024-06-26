import { createClient } from "@/utils/supabase/server";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";

export default async function ButtonLogin() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <Button asChild variant="ghost" className="font-bold text-base" size={"sm"}>
      <Link href="/dashboard/my-library">
        Go to app <ArrowRightIcon size={17} className="ml-1" />
      </Link>
    </Button>
  ) : (
    <Button asChild variant="ghost" className="font-bold text-base" size={"sm"}>
      <Link href="/authenticate/login">
        Go to login <ArrowRightIcon size={17} className="ml-1" />
      </Link>
    </Button>
  );
}
