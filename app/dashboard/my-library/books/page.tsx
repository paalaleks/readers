import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import AddBooks from "./AddBooks";
import RenderedBooks from "./RenderedBooks";
import ToggleBooksLabels from "../ToggleBooksLabels";
import Menu from "../../Menu";

export default async function page() {
  const supabase = createClient();
  const user = await userServer();

  const { data } = await supabase
    .from("myLibrary")
    .select("books, codeSeries, user_id")
    .eq("user_id", user?.id)
    .single();

  const staticUserId = user?.id ?? "";
  const staticMyLibrary = data?.books ?? null;
  const staticCodeSeries = data?.codeSeries ?? null;

  return (
    <>
      <nav className="flex items-center justify-center h-24 relative z-10 max-w-5xl mx-auto w-full ">
        <Menu />
        <ToggleBooksLabels />
        <AddBooks />
      </nav>

      <div className="flex flex-col items-center w-full mt-1">
        <RenderedBooks
          staticMyLibrary={staticMyLibrary}
          staticUserId={staticUserId}
          staticCodeSeries={staticCodeSeries}
        />
      </div>
    </>
  );
}
