import { getGenreMovies } from "@/features/movies/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genre = await getGenreMovies();

    return NextResponse.json(genre);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch genre movies." },
      { status: 500 }
    );
  }
}