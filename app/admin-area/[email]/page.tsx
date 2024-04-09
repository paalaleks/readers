import Link from "next/link";

export default async function Page({ params }: { params: { email: string } }) {
  const decodedEmail = decodeURIComponent(params.email);

  return (
    <div className="h-screen flex items-center flex-col w-full justify-center">
      <p className="flex justify-center flex-col">
        hey, {decodedEmail}.
        <span className="ml-1">
          Create Unique labels by clicking the button.
        </span>
      </p>
      <Link
        href={`/admin-area/${decodeURIComponent(params.email)}/generate`}
        className="rounded-lg py-2 mt-8 bg-muted text-center w-32 mx-auto hover:bg-primary/70 hover:text-background transition-colors ease-in-out"
      >
        Generate
      </Link>
    </div>
  );
}
