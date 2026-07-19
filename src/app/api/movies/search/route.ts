import { searchMovies } from "@/features/movies/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { message: "Query parameter is required." },
        { status: 400 }
      );
    }

    const movies = await searchMovies(query);

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch movies." },
      { status: 500 }
    );
  }
}