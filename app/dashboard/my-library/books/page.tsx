import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import Nav from "../../Nav";
import AddBooks from "./AddBooks";
import RenderedBooks from "./RenderedBooks";
import ToggleBooksLabels from "../ToggleBooksLabels";

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
      <Nav>
        <>
          <ToggleBooksLabels />
          {staticCodeSeries ? (
            <AddBooks />
          ) : (
            <div className="w-0 xs:w-[52px]"></div>
          )}
        </>
      </Nav>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col">
          <RenderedBooks
            staticMyLibrary={staticMyLibrary}
            staticUserId={staticUserId}
            staticCodeSeries={staticCodeSeries}
          />
        </div>
      </div>
    </>
  );
}
