import { getUpcomingMovies } from "@/features/movies/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const upcomingMovies = await getUpcomingMovies();

    return NextResponse.json(upcomingMovies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch upcoming movies." },
      { status: 500 }
    );
  }
}