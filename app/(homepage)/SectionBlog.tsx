import Link from "next/link";
import { Card } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/fetch";
import { SanityDocument } from "next-sanity";
import { postsQuery } from "@/sanity/queries";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default async function SectionBlog() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <section className="max-w-8xl mx-auto w-full  h-full  px-4 sm:px-8">
      <div className="z-10 relative animate-fade-in min-h-60 flex flex-col items-center pt-12 pb-16 max-w-6xl w-full mx-auto ">
        <h2 className="text-lg sm:text-xl  text-center mx-auto text-primary/70 flex items-center  ">
          Blog:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 pt-16">
          {posts.slice(0, 4).map((post) => (
            <Link
              href={`posts/${post.slug.current}`}
              key={post._id}
              className="group"
            >
              <Card className="bg-background border-none text-primary">
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
        <Button
          asChild
          variant="ghost"
          className="font-bold text-base mt-16"
          size={"sm"}
        >
          <Link href="/posts" className="">
            See all blog posts <ArrowRightIcon size={17} className="ml-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
