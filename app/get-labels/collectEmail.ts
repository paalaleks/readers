"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";

const loadEmailTemplate = () => {
  const filePath = path.resolve(process.cwd(), 'public/emails', 'NewsletterSignup.html');
  return readFileSync(filePath, 'utf8');
}

const sendEmail = async ({ email }: { email: string }) => {
  const htmlContent = loadEmailTemplate();

  try {

    await fetch('http://localhost:3000/api/send', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "hello@bookokay.app",
        to: email,
       
        subject: "We'll let you know when we launch!",
       html: htmlContent
        })
    })

  } catch (error: any) {
    throw new Error(error);
  }
}

const handleNewsletterSignup = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const supabase = createClient();
    const { error } = await supabase
      .from("collectedEmails")
      .insert([{ email }])
      .select();
    if (error) {
      console.error(error);
    }
    sendEmail({ email });
    redirect("/thank-you");
  };

export { handleNewsletterSignup };