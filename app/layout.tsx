import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground overflow-x-hidden relative min-h-screen pb-28">
        {children}
        <Footer />
      </body>
    </html>
  );
}
