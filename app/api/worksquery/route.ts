import type { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ message: "Query parameter is missing" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const openLibraryResponse = await fetch(`https://openlibrary.org/${key}.json`);

    if (!openLibraryResponse.ok) {
        throw new Error(`Failed to fetch from OpenLibrary: ${openLibraryResponse.statusText}`);
      }
    
    const data = await openLibraryResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error:any) {
    console.error("Error fetching data from OpenLibrary:", error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ message: `Error fetching data from OpenLibrary: ${error instanceof Error ? error.message : "An unknown error occurred"}` }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
}
