import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import Nav from "../../../../components/Nav";
import AddBooks from "./AddBooks";
import RenderedBooks from "./RenderedBooks";
import ToggleBooksLabels from "../ToggleBooksLabels";
import NavDashboardLinks from "@/app/dashboard/NavDashboardLinks";

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
      <Nav
        children1={
          <>
            <ToggleBooksLabels />
            {staticCodeSeries ? <AddBooks /> : <div className="w-[52px]"></div>}
          </>
        }
        children2={<NavDashboardLinks />}
        styles="w-40 pl-8 -ml-4 bg-background border border-accent rounded-xl py-6 mt-2"
      />

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col">
          <div className="grid gap-x-2 gap-y-2 grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 pb-8">
            <RenderedBooks
              staticMyLibrary={staticMyLibrary}
              staticUserId={staticUserId}
              staticCodeSeries={staticCodeSeries}
            />
          </div>
        </div>
      </div>
    </>
  );
}
