import AutocompletePeople from "./AutocompletePeople";
import FriendNotifications from "./FriendNotifications";
import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import RenderedLibraries from "./RenderedLibraries";
import { FriendLibrary, MyLibrary } from "@/types/project.types";
import Menu from "../Menu";

export default async function page() {
  const supabase = createClient();
  const user = await userServer();

  const { data: friendsData } = await supabase
    .from("friends")
    .select("*")
    .eq("receiver_id", user?.id);

  const { data: myLibraryData } = await supabase
    .from("myLibrary")
    .select("*")
    .eq("user_id", user?.id);

  const myLibrary =
    myLibraryData && myLibraryData.length > 0 ? myLibraryData[0] : null;

  const friends = friendsData && friendsData?.length > 0 ? friendsData : [];

  let staticFriendLibraries: MyLibrary[] = [];

  if (myLibrary && myLibrary.friends) {
    const friendUserIds = myLibrary?.friends.map((friend: string) => friend);
    const { data: staticFriendLibrariesData, error } = await supabase
      .from("myLibrary")
      .select("books, user_id, avatar, username, email")
      .in("user_id", friendUserIds);

    if (!error) {
      staticFriendLibraries = staticFriendLibrariesData.map((data: any) => ({
        key: data.user_id,
        user_id: data.user_id,
        friends: [],
        ...data,
      }));
    } else {
      console.error("Error fetching friends' libraries:", error);
    }
  }

  return (
    <>
      <nav className="flex items-center h-24 pl-24 xs:pl-0 relative z-10 max-w-5xl mx-auto w-full ">
        <Menu />
        <AutocompletePeople myLibrary={myLibrary} />
        <FriendNotifications initialFriends={friends || []} />
      </nav>

      <section className="px-4 flex flex-wrap flex-col gap-4 bg-background pb-8 ">
        <RenderedLibraries
          staticFriendLibraries={staticFriendLibraries as FriendLibrary[]}
        />
      </section>

      {staticFriendLibraries.length === 0 && (
        <h2 className="text-xl flex flex-col items-center justify-center text-center nav-content-footer screenMinHeight relative bottom-8 -mb-20">
          No friends added yet.
        </h2>
      )}
    </>
  );
}
