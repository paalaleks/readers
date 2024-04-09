import SendEmail from "./SendEmail";
import { createClient } from "@/utils/supabase/server";
import { useQrBorrow } from "./MutateMessage";

export default async function page({ params }: { params: { code: string } }) {
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

  const mailtoHref = await useQrBorrow(book, email, username, messages);
  console.log(mailtoHref);

  return <SendEmail mailto={mailtoHref ?? ""} />;
}
