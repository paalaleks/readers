import { createClient } from "@/utils/supabase/server";
import AvatarUpload from "@/components/AvatarUpload";
import Nav from "@/components/Nav";
import { getStyledMessages } from "./MutateMessages";
import Username from "./Username";
import Email from "./Email";
import userServer from "@/hooks/userServer";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";
import NavDashboardLinks from "@/app/dashboard/NavDashboardLinks";
import MessagesComponent from "./Messages";

export default async function page() {
  const user = await userServer();

  const supabase = createClient();

  let { data: myLibrary, error } = await supabase
    .from("myLibrary")
    .select("*")
    .eq("user_id", user?.id);

  if (error) console.log(error.message);

  const staticAvatar = myLibrary && myLibrary[0]?.avatar;
  const staticUsername = myLibrary && myLibrary[0]?.username;
  const staticEmail = myLibrary && myLibrary[0]?.email;
  const staticUserId = myLibrary && myLibrary[0]?.user_id;

  const styledMessages = await getStyledMessages();

  return (
    <main className="mx-auto max-w-5xl w-full">
      <Nav
        children1={undefined}
        children2={<NavDashboardLinks />}
        styles="w-40 pl-8 -ml-5 bg-background border border-accent rounded-xl py-6 mt-2"
      />
      <fieldset className="border rounded-xl border-accent mx-4 px-4 pt-6 pb-8 mb-8  mt-1 relative">
        <legend className="bg-background px-2 text-primary/80 h-0 flex items-center">
          <h3>Profile</h3>
        </legend>
        <div className="mx-auto max-w-md w-full flex flex-col justify-center space-y-2 px-4">
          <AvatarUpload staticAvatar={staticAvatar} />
          <Username
            staticUsername={staticUsername}
            staticUserId={staticUserId}
          />
        </div>
      </fieldset>
      <MessagesComponent
        staticUserId={staticUserId}
        styledMessages={styledMessages}
      />

      <fieldset className="border rounded-xl border-accent mx-4 px-4 pt-6 pb-8 mb-16 flex flex-col justify-center relative">
        <legend className="bg-background px-2 text-primary/80 h-0 flex items-center">
          <h3>Account</h3>
        </legend>
        <p className="rounded-xl mx-auto max-w-md mt-4 mb-6">
          <span>Disclaimer:</span> If you alter your password or email then you
          will be logged out and you will have to log in again.
        </p>

        <Email staticEmail={staticEmail} />
        <Password />
        <DeleteAccount />
      </fieldset>
    </main>
  );
}
