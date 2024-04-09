import { Card } from "@/components/ui/card";
import React from "react";

export default function SectionBlog() {
  return (
    <div className="max-w-8xl mx-auto w-full bg-[#1C130E] h-full pt-12">
      <section className="z-10 relative animate-fade-in min-h-60 flex items-center flex-col sm:flex-row py-6  max-w-4xl w-full mx-auto bg-card">
        <div className="h-4"></div>
        <div className=" pl-8 pr-4 w-full flex items-center flex-col">
          <h3 className="text-lg sm:text-xl absolute -top-2 sm:top-0 left-8 sm:left-auto whitespace-nowrap text-primary">
            Blog:
          </h3>
          <Card className="p-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary/90 mb-4 relative z-20 whitespace-nowrap text-center">
              Title
            </h2>
            <p className="text-2xl max-w-md max-w-[400px]:pb-0 pb-4 text-center text-primary/90">
              Some text about the blog post.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
