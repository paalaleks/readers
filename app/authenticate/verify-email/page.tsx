import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createClient();
  const user = await userServer();

  const messages = {
    qrSubject:
      'Borrowing <span class="inserted-text">book title</span> via book okay 📚👍',
    qrMessage:
      'Thanks for lending me "<span class="inserted-text">book title</span>" by <span class="inserted-text">book author</span>! Contact me when you need it back! 📚👋',
    libSubject:
      'Interest in borrowing: <span class="inserted-text">book title</span>',
    libMessage:
      'Hello <span class="inserted-text">owner name</span>, I am interested in borrowing "<span class="inserted-text">book title</span> by <span class="inserted-text">book author</span>. Could you let me know if it\'s available? Thank you!',
  };

  const { error: myLibraryError } = await supabase.from("myLibrary").upsert({
    user_id: user?.id,
    email: user?.email,
    messages: messages,
  });
  if (myLibraryError) {
    console.error("Error inserting user in myLibrary:", myLibraryError);
    return redirect(
      "/authenticate/login?message=Problems creating the user, please try again."
    );
  }

  return (
    <div className="px-8 w-full max-w-md flex flex-col h-full justify-center flex-1 screenMinHeight">
      <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
        Your e-mail is confirmed. You can just close this window.
      </h1>
    </div>
  );
}
