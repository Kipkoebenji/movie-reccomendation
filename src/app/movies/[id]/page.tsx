"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  movieDetailsOptions,
  similarMoviesOptions,
  movieCastOptions,
} from "@/features/movies/queryProvider";
import { Star, ArrowLeft, Clock, ImageOff } from "lucide-react";
import { useParams } from "next/navigation";

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500">
      <ImageOff className="size-10" aria-hidden="true" />
    </div>
  );
}

export default function MovieDetails() {
  const img = () => `/main.jpeg`;

  const { id } = useParams();

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const active = hovered ?? selected ?? 0;

  const { data: moviesData } = useQuery(movieDetailsOptions(Number(id)));

  const { data: similarMoviesData } = useQuery(
    similarMoviesOptions(Number(id)),
  );
  const { data: castMoviesData } = useQuery(movieCastOptions(Number(id)));

  if (!moviesData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-105">
        {moviesData.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${moviesData.backdrop_path}`}
            alt=""
            fill
            priority
            className="object-cover object-top"
          />
        ) : (
          <ImagePlaceholder />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </section>

      <div className="-mt-40 relative z-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-8">
          {/* Poster */}
          <div>
            <div className="relative aspect-2/3 rounded-2xl overflow-hidden">
              {moviesData.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${moviesData.poster_path}`}
                  alt={moviesData.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            <button className="mt-4 w-full rounded-xl bg-white/10 py-3 text-white hover:bg-white/20">
              ♡ Add to Watchlist
            </button>

            {/* Rating */}
            <div className="mt-4 rounded-xl bg-white/10 p-4">
              <p className="text-center text-sm text-zinc-400 mb-3">
                Rate this Movie
              </p>

              <div
                className="flex justify-center gap-1"
                onMouseLeave={() => setHovered(null)}
              >
                {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                  <button
                    key={value}
                    onMouseEnter={() => setHovered(value)}
                    onClick={() => setSelected(value)}
                  >
                    <Star
                      className={`size-6 ${
                        value <= active
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pt-4 md:pt-40">
            <h1 className="text-5xl font-bold text-white">
              {moviesData.title}
            </h1>

            <p className="italic mt-2 text-blue-300">
              &ldquo;{moviesData.tagline}&rdquo;
            </p>

            <div className="flex gap-5 mt-5 text-zinc-300">
              <span>{moviesData.release_date}</span>

              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {moviesData.runtime} mins
              </span>

              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                4/5
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {moviesData.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-slate-800 px-3 py-1 text-sm text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <hr className="my-6 border-white/10" />

            <h2 className="text-white text-xl font-semibold">Overview</h2>

            <p className="text-zinc-300 mt-2 leading-relaxed">
              {moviesData.overview}
            </p>

            {/* Cast */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Top Cast
              </h2>

              <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                {castMoviesData?.cast.slice(0, 8).map((member) => (
                  <div key={member.id} className="w-24 shrink-0 text-center">
                    <div className="relative size-16 rounded-full overflow-hidden">
                      {member.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </div>

                    <p className="mt-2 text-sm text-white truncate">
                      {member.name}
                    </p>

                    <p className="text-xs text-zinc-400 truncate">
                      {member.character}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Recommendations */}
        <section className="max-w-6xl mx-auto mt-12 pb-16">
          <h2 className="text-xl font-semibold text-white mb-4">
            More Like This
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {similarMoviesData?.results?.slice(0, 18).map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <div className="relative aspect-2/3 rounded-lg overflow-hidden">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>

                <p className="mt-2 text-sm text-zinc-200 truncate">
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
