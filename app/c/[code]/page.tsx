export default function page({ params }: { params: { code: string } }) {
  console.log(params.code);
  return <div></div>;
}
