"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { searchMovies } from "@/services/movies";
import type { Movie } from "@/types/movies";
import Image from "next/image";
import Header from "@/components/layout/(Header)/Navbar";
import Footer from "@/components/layout/(Footer)/Footer";
import { Star, Play, Ticket } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery.trim());

  const cast = ["/cast/1.jpg"];

  const {
    data: movies = [],
    isFetching,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ["movies", "search", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    placeholderData: (previousData) => previousData,
  });

  return (
    <>
      <main>
        <div className="fixed inset-0 -z-10 bg-[url(/_.jpeg)] bg-cover bg-center bg-no-repeat" />
        <div className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm" />
        <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6">
          <Header />
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Movie search
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Find films with TanStack Query
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Search TMDB with cached, debounced requests powered by React
              Query.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          />

          {isFetching ? (
            <p className="text-sm text-slate-500">Searching...</p>
          ) : null}
          {isError ? (
            <p className="text-sm text-red-600">
              Unable to load movies right now.
            </p>
          ) : null}

          {!debouncedQuery ? (
            <p className="text-sm text-slate-500">
              Start typing to see results.
            </p>
          ) : null}

          <ul className="grid gap-4 sm:grid-cols-2">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <strong className="block text-lg text-slate-950">
                  {movie.title}
                </strong>
                <p className="mt-2 text-sm text-slate-500">
                  {movie.release_date || "No release date"}
                </p>
                <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
                  {movie.overview}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-row flex-wrap">
          <div className="origin-left transform-[perspective(1000px)_rotateY(25deg)]">
            <Image
              className="w-auto"
              width={180}
              height={10}
              src="/main.jpeg"
              alt="Movie poster"
            />
          </div>

          <div className="relative flex flex-col md:flex-row items-start gap-8 rounded-3xl bg-neutral-900/70 backdrop-blur-md p-6 md:p-10">
            {/* Poster - overlaps upward out of the card */}
            <div className="relative -mt-16 md:-mt-24 w-full md:w-[320px] shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src="/footer.jpeg"
                alt="The Devil Princess poster"
                width={400}
                height={560}
                className="w-full h-105 md:h-140 object-cover"
              />

              {/* Book Now button sits on top of the poster */}
              <button className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-pink-600 hover:bg-pink-500 transition-colors px-6 py-3 text-sm font-semibold text-white shadow-lg">
                <Ticket size={16} />
                BOOK NOW
              </button>
            </div>

            {/* Details */}
            <div className="flex-1 text-white pt-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                The Devil Princess
              </h1>

              <div className="mt-3 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-neutral-300 text-sm">
                  180k voters
                </span>
              </div>

              <p className="mt-5 max-w-xl text-neutral-300 leading-relaxed">
                She is a devil princess from the demon world. She grew up
                sheltered by her parents and doesn&apos;t really know how to be
                evil or any of the common actions. She is unable to cry due to
                Keita&apos;s accidental first wish, despite needed for him to
                wish&hellip;
              </p>

              <h3 className="mt-8 text-xl font-semibold">Cast:</h3>
              <div className="mt-3 flex items-center -space-x-3">
                {cast.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-11 h-11 rounded-full ring-2 ring-neutral-900 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Cast member ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full ring-2 ring-neutral-900 bg-neutral-900 border border-pink-500 flex items-center justify-center text-pink-400 text-xs font-semibold">
                  5+
                </div>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <span className="text-xl font-semibold">Watch Trailer</span>
                <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-6 py-3 text-sm font-semibold">
                  <Play size={16} fill="white" />
                  Play Now
                </button>
              </div>
            </div>
          </div>

          <div className="origin-right transform-[perspective(1200px)_rotateY(-20deg)]">
            <Image
              className="w-auto"
              width={180}
              height={1}
              src="/main.jpeg"
              alt="Movie poster"
            />
          </div>
        </section>

        <section>
          <h1>This is the next section</h1>
          <p>This will have the movies cards</p>
        </section>

         <section>
          <h1>This is the next section</h1>
          <p>This will have latest news</p>
        </section>

         <section>
          <h1>This is the next section</h1>
        </section>
      </main>

      <Footer />
    </>
  );
}
