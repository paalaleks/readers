import NavMyLibrary from "@/app/Nav";
import AutocompletePeople from "./AutocompletePeople";
import FriendNotifications from "./FriendNotifications";
import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import RenderedLibraries from "./RenderedLibraries";
import { FriendLibrary, MyLibrary } from "@/types/project.types";
import NavDashboardLinks from "@/app/NavDashboardLinks";
import Wrapper from "@/components/Wrapper";

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
    <Wrapper>
      <NavMyLibrary
        children1={
          <>
            <AutocompletePeople myLibrary={myLibrary} />
            <FriendNotifications initialFriends={friends || []} />
          </>
        }
        children2={<NavDashboardLinks />}
        styles="w-40 pl-8 -ml-4 bg-background border border-accent rounded-xl py-6 mt-2"
      />
      <section className="px-4 min-[450px]:px-8 grid grid-cols-1 gap-4 bg-background pb-8">
        <RenderedLibraries
          staticFriendLibraries={staticFriendLibraries as FriendLibrary[]}
        />
      </section>
    </Wrapper>
  );
}
