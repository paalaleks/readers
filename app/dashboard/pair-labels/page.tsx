import NavDashboardLinks from "@/app/dashboard/NavDashboardLinks";
import Nav from "@/components/Nav";
import FormPairCode from "./FormPairCode";
import userServer from "@/hooks/userServer";

export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await userServer();

  return (
    <main className="nav-content-footer screenMinheight flex flex-col justify-center max-w-5xl mx-auto">
      <Nav
        children1={undefined}
        children2={<NavDashboardLinks />}
        styles="w-40 pl-8 -ml-5 bg-background border border-accent rounded-xl py-6 mt-2"
      />
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
