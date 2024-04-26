import FormPairCode from "./FormPairCode";
import userServer from "@/hooks/userServer";
import Menu from "../Menu";

export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await userServer();

  return (
    <main className="nav-content-footer screenMinheight flex flex-col justify-center ">
      <nav className="flex items-center justify-center h-24 relative z-10 max-w-5xl mx-auto w-full ">
        <Menu />
      </nav>
      <div className="flex flex-col justify-center items-center flex-1 ">
        <FormPairCode userId={user?.id ?? ""} />
        {searchParams?.message && (
          <p className="p-4 mt-12 text-center max-w-md rounded-2xl bg-primary text-primary-foreground">
            {searchParams.message}
          </p>
        )}
      </div>
    </main>
  );
}
