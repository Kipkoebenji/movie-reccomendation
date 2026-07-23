import { getTopRatedMovies } from "@/features/movies/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topRatedMovies = await getTopRatedMovies();

    return NextResponse.json(topRatedMovies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch top rated movies." },
      { status: 500 }
    );
  }
}