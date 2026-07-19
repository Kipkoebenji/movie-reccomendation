import { NextResponse } from "next/server";
import { getMovies } from "@/features/movies/services";

export async function GET() {
  try {
    const movies = await getMovies();

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch movies." },
      { status: 500 }
    );
  }
}