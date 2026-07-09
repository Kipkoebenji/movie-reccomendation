"use client";

import Image from "next/image";
import { Button } from "./button";

export interface Movie {
   id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="rounded-xl border p-4">
      <Image
        src={movie.poster_path ?? "/logo.png"}
        alt={movie.title}
        width={400}
        height={600}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <Button>Watch</Button>
    </div>
  );
}
