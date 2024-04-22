import Link from "next/link";

export default function page() {
  return (
    <div className="animate-in flex flex-col justify-center items-center px-4 sm:px-8 flex-1">
      <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
        Legal pages
      </h1>
      <div className="space-y-2 flex flex-col text-center">
        <Link href="/legal/cookie-policy" className="hover:underline text-xl">
          Cookie Policy
        </Link>
        <Link href="/legal/privacy-policy" className="hover:underline text-xl">
          Privacy Policy
        </Link>
        <Link
          href="/legal/terms-of-service"
          className="hover:underline text-xl"
        >
          Terms of service
        </Link>
      </div>
    </div>
  );
}
