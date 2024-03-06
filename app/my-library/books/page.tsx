import FormAddBooks from "./FormAddBooks";

export default function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
      <div className="flex-1 flex flex-col gap-20  max-w-4xl px-3 w-full">
        <div className="flex flex-col gap-16 items-center w-full">
          <div className="flex flex-col justify-center items-center">
            <FormAddBooks />
          </div>
        </div>
      </div>
      {searchParams?.message && (
        <p className=" z-30 p-4 bg-foreground/10 bottom-24 text-foreground text-center w-full max-w-md">
          {searchParams.message}
        </p>
      )}
    </>
  );
}
