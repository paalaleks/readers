import NavBack from "@/components/NavBack";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/fetch";
import { SanityDocument } from "next-sanity";
import { postsQuery } from "@/sanity/queries";

export default async function page() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 max-w-4xl mx-auto">
        {posts.slice(0, 4).map((post) => (
          <Link
            href={`posts/${post.slug.current}`}
            key={post._id}
            className="group"
          >
            <Card className="bg-card p-4">
              <div>
                {post?.mainImage && (
                  <Image
                    className="max-h-56 object-cover rounded-lg w-full"
                    src={post.imageURL}
                    alt={post.mainImage.alt || "blog image"}
                    width={350}
                    height={350}
                    priority
                  />
                )}
                <h2 className="text-lg font-bold py-2 leading-5 group-hover:underline underline-offset-4">
                  {post.title}
                </h2>
                <p className=" text-muted-foreground text-xs font-light ">
                  {convertDate(post._createdAt)} •
                  <span className="capitalize ml-1">{post.authorName}</span>
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
