"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { searchMovies } from "@/services/movies";
import type { Movie } from "@/types/movies";
import Header from "@/components/layout/(Header)/page";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery.trim());

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
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6">
      <Header />
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Movie search
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          Find films with TanStack Query
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Search TMDB with cached, debounced requests powered by React Query.
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
        <p className="text-sm text-red-600">Unable to load movies right now.</p>
      ) : null}

      {!debouncedQuery ? (
        <p className="text-sm text-slate-500">Start typing to see results.</p>
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
    </main>
  );
}
