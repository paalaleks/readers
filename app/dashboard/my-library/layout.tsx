import Wrapper from "@/components/Wrapper";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
