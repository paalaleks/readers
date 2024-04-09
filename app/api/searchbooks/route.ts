import type { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ message: "Query parameter is missing" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const openLibraryResponse = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
    
    const data = await openLibraryResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error:any) {
    console.error("Error fetching data from OpenLibrary:", error.message);
    return new Response(JSON.stringify({ message: `Error fetching data from OpenLibrary: ${error.message}` }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
}
