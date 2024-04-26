import React from "react";
import Nav from "../../Nav";
import { createClient } from "@/utils/supabase/server";
import userServer from "@/hooks/userServer";
import { CodeSeriesItem, MyLibrary, Book } from "@/types/project.types";
import ToggleBooksLabels from "../ToggleBooksLabels";

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
    myLibrary?.books?.find((book: Book) => book.url === code);

  return (
    <>
      <Nav>
        <>
          <ToggleBooksLabels />
          <div className="w-[52px]" />
        </>
      </Nav>

      <main className="flex flex-col items-center w-full">
        <div className="flex flex-col">
          {codeSeries && codeSeries.length > 0 ? (
            <>
              {articles.map((article, articleIndex) => (
                <article key={articleIndex} className="flex flex-col">
                  <div className="w-full grid grid-cols-4 border border-muted p-4 gap-[1px]">
                    {article.map((item) => {
                      const book = findBookByCode(item.code);
                      return (
                        <div
                          key={item.code}
                          className={`w-[45.8px] h-[24px] xxs:w-[73.32px] xxs:h-[38.4px] xs:w-[91.5px] xs:h-[48px] sm:w-[138px] sm:h-[72px] outline outline-1 outline-muted transition-all duration-300 ease-in-out flex flex-col items-center justify-center px-2 `}
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
            </>
          ) : (
            <h2 className="text-xl flex flex-1 items-center justify-center screenMinHeight nav-content-footer -mb-32">
              You need to pair labels.
            </h2>
          )}
        </div>
      </main>
    </>
  );
}


