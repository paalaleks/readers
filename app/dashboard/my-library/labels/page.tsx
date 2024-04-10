import React from "react";
import Nav from "../../../Nav";
import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import { CodeSeriesItem, MyLibrary } from "@/types/project.types";
import ToggleBooksLabels from "../ToggleBooksLabels";
import NavDashboardLinks from "@/app/NavDashboardLinks";

export default async function page() {
  const user = await userServer();
  const supabase = createClient();

  const { data: myLibraryData } = await supabase
    .from("myLibrary")
    .select("books, codeSeries, user_id")
    .eq("user_id", user?.id);

  const myLibrary: MyLibrary | null =
    myLibraryData && myLibraryData.length > 0 ? myLibraryData[0] : null;

  const codeSeries: CodeSeriesItem[] = myLibrary?.codeSeries || [];

  const gridItemsPerArticle = 44;
  const totalArticles = Math.ceil(codeSeries.length / gridItemsPerArticle);

  const articles = Array.from({ length: totalArticles }, (_, index) =>
    codeSeries.slice(
      index * gridItemsPerArticle,
      (index + 1) * gridItemsPerArticle
    )
  );

  const findBookByCode = (code: string) =>
    myLibrary?.books?.find((book: { url: string }) => book.url === code);

  return (
    <>
      <Nav
        children1={
          <>
            <ToggleBooksLabels />
            <div className="w-[52px]" />
          </>
        }
        children2={<NavDashboardLinks />}
        styles="w-40 pl-8 -ml-4 bg-background border border-accent rounded-xl py-6 mt-2"
      />

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col">
          {codeSeries && codeSeries.length > 0 ? (
            <div className="flex flex-col">
              {articles.map((article, articleIndex) => (
                <article key={articleIndex} className="flex flex-col">
                  <div className="w-full grid grid-cols-4 border border-muted p-4 gap-[1px]">
                    {article.map((item) => {
                      const book = findBookByCode(item.code);
                      return (
                        <div
                          key={item.code}
                          className={`w-[45.8px] h-[24px] min-[360px]:w-[73.32px] min-[360px]:h-[38.4px] min-[424px]:w-[91.5px] min-[424px]:h-[48px] sm:w-[138px] sm:h-[72px] outline outline-1 outline-muted transition-all duration-300 ease-in-out flex flex-col items-center justify-center px-2 `}
                        >
                          {book ? (
                            book.status === "DELETED" ? (
                              <div>
                                <span className="text-xs text-center text-muted-foreground pt-1">
                                  {item.code}
                                </span>
                              </div>
                            ) : (
                              <>
                                <span className="text-xs text-center line-clamp-2">
                                  {book.title} by {book.author}
                                </span>
                                <span className="text-xs text-center text-muted-foreground pt-1">
                                  {item.code}
                                </span>
                              </>
                            )
                          ) : (
                            <span className="text-xs text-center text-muted-foreground">
                              {item.code}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-xs mx-auto my-4 flex items-center text-muted-foreground">
                    {articleIndex + 1}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="whitespace-nowrap  absolute left-10 ml-10">
              You need to pair labels.
            </div>
          )}
        </div>
      </div>
    </>
  );
}


