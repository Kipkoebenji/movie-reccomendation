import { getCast } from "@/features/movies/server";
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

    const cast = await getCast({ id: movieId });

    return NextResponse.json(cast);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch cast." },
      { status: 500 },
    );
  }
}
