import NavDashboardLinks from "@/app/NavDashboardLinks";
import Nav from "@/app/Nav";
import FormPairCode from "./FormPairCode";
import userServer from "@/hooks/userServer";
import Wrapper from "@/components/Wrapper";

export default async function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await userServer();

  return (
    <Wrapper>
      <section className="nav-content-footer min-h-screen flex flex-col justify-center ">
        <Nav
          children1={undefined}
          children2={<NavDashboardLinks />}
          styles="w-40 pl-8 -ml-4 bg-background border border-accent rounded-xl py-6 mt-2"
        />
        <div className="flex flex-col justify-center items-center flex-1 pb-20">
          <FormPairCode userId={user?.id ?? ""} />
          {searchParams?.message && (
            <p className="p-4 mt-12 text-center max-w-md rounded-2xl bg-primary text-primary-foreground">
              {searchParams.message}
            </p>
          )}
        </div>
      </section>
    </Wrapper>
  );
}
