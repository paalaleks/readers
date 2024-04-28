import SendEmail from "./SendEmail";
import { createClient } from "@/utils/supabase/server";
import { generateMailtoHrefForBook } from "./GenerateMailtoHrefForBook";
import NavBack from "@/components/NavBack";

export default async function Page({ params }: { params: { code: string } }) {
  const supabase = createClient();

  let { data: myLibrary, error } = await supabase
    .from("myLibrary")
    .select("books, email, username, user_id, messages")
    .filter("books", "cs", `[{ "url": "${params.code}" }]`)
    .single();

  if (error || !myLibrary) {
    return (
      <main className="screenMinHeight nav-content-footer flex flex-col justify-center items-center max-w-5xl mx-auto">
        <nav className="flex flex-row justify-between items-center h-24 px-4 min-[400px]:px-8 relative z-10 max-w-5xl w-full mx-auto">
          <NavBack />
        </nav>

        <div className="animate-in flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
          <h1 className="text-3xl text-center text-primary px-4 font-bold">
            You need to creater an account and register the organge and black
            label to start using bookokay.
          </h1>
        </div>
      </main>
    );
  }

  const { books, email, username, messages } = myLibrary;
  const book = books[0];

  const mailtoHref = await generateMailtoHrefForBook(
    book,
    email,
    username,
    messages
  );

  return <SendEmail mailto={mailtoHref ?? ""} />;
}
