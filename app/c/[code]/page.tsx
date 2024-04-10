import SendEmail from "./SendEmail";
import { createClient } from "@/utils/supabase/server";
import { generateMailtoHrefForBook } from "./GenerateMailtoHrefForBook";

export default async function Page({ params }: { params: { code: string } }) {
  const supabase = createClient();

  let { data: myLibrary, error } = await supabase
    .from("myLibrary")
    .select("books, email, username, user_id, messages")
    .filter("books", "cs", `[{ "url": "${params.code}" }]`)
    .single();

  if (error || !myLibrary) {
    return (
      <div className="nav-content-footer min-h-screen flex flex-col justify-center items-center">
        Book not found
      </div>
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
