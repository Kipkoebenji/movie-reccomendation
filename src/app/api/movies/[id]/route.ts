import { getMovieDetails } from "@/features/movies/services";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const movieId = Number(id);

    if (Number.isNaN(movieId)) {
      return NextResponse.json(
        { message: "Movie id must be a number." },
        { status: 400 },
      );
    }

    const movie = await getMovieDetails({ id: movieId });

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch movie details." },
      { status: 500 },
    );
  }
}
