"use client";

import { useEffect, useState } from "react";
import { searchMovies } from "../services/movies";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setError(null);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await searchMovies(trimmedQuery);
        setMovies(results);
      } catch {
        setError("Unable to load movies right now.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <main>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? <p>Searching...</p> : null}
      {error ? <p>{error}</p> : null}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>
            <p>{movie.release_date || "No release date"}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
