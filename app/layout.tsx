import { GeistSans } from "geist/font/sans";
import "./globals.css";
import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Okay - Home page",
  description:
    "Book Okay makes it easy to share libraries and keep track of your good books.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased text-foreground relative screenMinHeight pb-32">
        {children}
        <Footer />
      </body>
    </html>
  );
}
