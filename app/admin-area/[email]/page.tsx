import Link from "next/link";

export default async function Page({ params }: { params: { email: string } }) {
  const decodedEmail = decodeURIComponent(params.email);

  return (
    <>
      <div className="h-screen flex items-center flex-col w-full justify-center">
        <nav className="w-full flex justify-center">hey, {decodedEmail}.</nav>
        <div className="px-6">
          <p>Create Unique labels by clicking the button.</p>
        </div>
        <Link
          href={`/admin-area/${decodeURIComponent(params.email)}/generate`}
          className="rounded-lg py-2 mt-8 w-full bg-muted text-center"
        >
          Generate
        </Link>
      </div>
    </>
  );
}
