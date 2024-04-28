import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

type Tag = {
  name: string;
  value: string;
};

interface Props {
  from: string;
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  html?: string;
  reply_to?: string;
  subject: string;
  content: string;
  headers?: any;
  attachments?: Buffer | string;
  tags?: Tag[];
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  let { from, to, html, subject }: Props = body;

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "missing content" });
  }
}
