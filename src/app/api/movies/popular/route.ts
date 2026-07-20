import { getPopularMovies } from "@/features/movies/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await getPopularMovies();

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch movies." },
      { status: 500 }
    );
  }
}