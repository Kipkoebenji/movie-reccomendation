"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Star } from "lucide-react";

export default function MoviePage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const img = (path: string) => `/main.jpeg`;

  const backdrop = (path: string) => `/main.jpeg`;

  const movie = {
    id: 1040148,
    title: "Moana",
    tagline: "The ocean chose her for a reason.",
    overview:
      "Teenage Moana answers the Ocean's call and, for the first time, voyages beyond the reef of her island of Motunui with infamous demigod Maui on an unforgettable journey to restore prosperity to her people.",
    backdropPath: backdrop("/backdrop-placeholder.jpg"),
    posterPath: img("/poster-placeholder.jpg"),
    releaseYear: 2026,
    runtimeMinutes: 115,
    rating: 3,
    genres: ["Family", "Fantasy", "Comedy", "Adventure"],

    cast: [
      {
        id: 1,
        name: "Catherine Laga'aia",
        character: "Moana",
        profilePath: img("/cast-1.jpg"),
      },
      {
        id: 2,
        name: "Dwayne Johnson",
        character: "Maui",
        profilePath: img("/cast-2.jpg"),
      },
      {
        id: 3,
        name: "Rena Owen",
        character: "Gramma Tala",
        profilePath: img("/cast-3.jpg"),
      },
      {
        id: 4,
        name: "John Tui",
        character: "Chief Tui",
        profilePath: img("/cast-4.jpg"),
      },
      {
        id: 5,
        name: "Frankie Adams",
        character: "Sina",
        profilePath: img("/cast-5.jpg"),
      },
    ],

    recommendations: [
      {
        id: 2,
        title: "Moana 2",
        posterPath: img("/rec-1.jpg"),
      },
      {
        id: 3,
        title: "The Sea Beast",
        posterPath: img("/rec-2.jpg"),
      },
      {
        id: 4,
        title: "Ruby Gillman",
        posterPath: img("/rec-3.jpg"),
      },
      {
        id: 5,
        title: "Lilo & Stitch",
        posterPath: img("/rec-4.jpg"),
      },
    ],
  };

  const active = hovered ?? selected ?? 0;

  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[420px]">
        <Image
          src={movie.backdropPath}
          alt=""
          fill
          priority
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

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
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
              <Image
                src={movie.posterPath}
                alt={movie.title}
                fill
                className="object-cover"
              />
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
            <h1 className="text-5xl font-bold text-white">{movie.title}</h1>

            <p className="italic mt-2 text-blue-300">"{movie.tagline}"</p>

            <div className="flex gap-5 mt-5 text-zinc-300">
              <span>{movie.releaseYear}</span>

              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {movie.runtimeMinutes} mins
              </span>

              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {movie.rating}/5
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-slate-800 px-3 py-1 text-sm text-white"
                >
                  {genre}
                </span>
              ))}
            </div>

            <hr className="my-6 border-white/10" />

            <h2 className="text-white text-xl font-semibold">Overview</h2>

            <p className="text-zinc-300 mt-2 leading-relaxed">
              {movie.overview}
            </p>

            {/* Cast */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Top Cast
              </h2>

              <div className="flex gap-6 overflow-x-auto">
                {movie.cast.map((member) => (
                  <div key={member.id} className="w-24 shrink-0 text-center">
                    <div className="relative size-16 rounded-full overflow-hidden">
                      <Image
                        src={member.profilePath}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
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
            {movie.recommendations.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src={movie.posterPath}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
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
