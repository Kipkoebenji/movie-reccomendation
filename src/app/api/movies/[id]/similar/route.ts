import { getSimilarMovies } from "@/features/movies/server";
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

    const similarMovies = await getSimilarMovies({ id: movieId });
    return NextResponse.json(similarMovies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch similar movies." },
      { status: 500 },
    );
  }
}