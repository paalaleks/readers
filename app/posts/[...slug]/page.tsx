import { SanityDocument } from "@sanity/client";
import { postQuery } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/fetch";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import NavBack from "@/components/NavBack";

export const revalidate = 60;
const builder = imageUrlBuilder(client);

export default async function PostPage({ params }: { params: any }) {
  const slug = params.slug.toString();

  const post = await sanityFetch<SanityDocument>({
    query: postQuery,
    params: { slug },
  });
  return (
    <>
      <nav className="flex flex-row justify-between items-center h-24 px-4 xs:px-8 relative z-10 max-w-5xl w-full mx-auto">
        <NavBack />
      </nav>
      <article className="container mx-auto prose prose-xl px-8 pb-8 text-foreground">
        <h1 className="text-foreground">{post.title}</h1>
        <p>{post.description}</p>
        {post?.mainImage ? (
          <Image
            src={builder
              .image(post.mainImage)
              .width(300)
              .height(300)
              .url()}
            alt={post?.mainImage?.alt}
            width={300}
            height={300}
          />
        ) : null}
        {post?.body ? <PortableText value={post.body} /> : null}
      </article>
    </>
  );
}
