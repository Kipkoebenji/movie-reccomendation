"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { searchMovies } from "@/services/movies";
import type { Movie } from "@/types/movies";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

// ─── Mock / placeholder data (replace with real API calls) ────────────────────

const FEATURED: Movie = {
  id: 0,
  title: "Dune: Part Two",
  overview:
    "Paul Atreides unites with Chani and the Fremen to wage war against the conspirators who destroyed his family.",
  release_date: "2024-03-01",
  poster_path: null,
  backdrop_path: null,
  vote_average: 8.5,
};

const MOCK_MOVIES: Movie[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: ["Oppenheimer", "Poor Things", "The Zone of Interest", "Past Lives", "Killers of the Flower Moon", "Saltburn", "Io Capitano", "Society of the Snow", "American Fiction", "Fallen Leaves"][i],
  overview: "A critically acclaimed film that captivated audiences worldwide with its stunning visuals and compelling story.",
  release_date: "2024-01-15",
  poster_path: null,
  backdrop_path: null,
  vote_average: 7 + Math.random() * 2,
}));

const GENRES = [
  { id: 28, name: "Action", emoji: "💥" },
  { id: 35, name: "Comedy", emoji: "😂" },
  { id: 18, name: "Drama", emoji: "🎭" },
  { id: 27, name: "Horror", emoji: "👻" },
  { id: 878, name: "Sci-Fi", emoji: "🚀" },
  { id: 10749, name: "Romance", emoji: "💘" },
  { id: 53, name: "Thriller", emoji: "🔪" },
  { id: 16, name: "Animation", emoji: "✨" },
];

const CONTINUE_WATCHING: (Movie & { progress: number })[] = [
  { ...MOCK_MOVIES[0], progress: 68 },
  { ...MOCK_MOVIES[1], progress: 32 },
  { ...MOCK_MOVIES[2], progress: 90 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ score }: { score: number }) {
  const pct = Math.round((score / 10) * 100);
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-yellow-400">
      <svg className="h-3 w-3 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      {(score).toFixed(1)}
      <span className="font-normal text-slate-400">/ 10</span>
    </span>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const hue = (movie.id * 47) % 360;
  return (
    <div className="group relative flex-none w-40 sm:w-48 cursor-pointer">
      {/* Poster */}
      <div
        className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden"
        style={{ background: `hsl(${hue} 30% 18%)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 60% 25%) 0%, hsl(${(hue + 60) % 360} 40% 15%) 100%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-10 w-10 text-white/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
          </svg>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
            <svg className="h-5 w-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Rating badge */}
        {movie.vote_average != null && (
          <div className="absolute top-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-bold text-yellow-400">
            ★ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      {/* Info */}
      <div className="mt-2 px-0.5">
        <p className="truncate text-sm font-medium text-slate-100 group-hover:text-white">{movie.title}</p>
        <p className="text-xs text-slate-500">{movie.release_date?.slice(0, 4) ?? "—"}</p>
      </div>
    </div>
  );
}

function ContinueCard({ movie }: { movie: Movie & { progress: number } }) {
  const hue = (movie.id * 47) % 360;
  return (
    <div className="group relative flex-none w-64 sm:w-72 cursor-pointer">
      <div
        className="relative h-36 w-full rounded-xl overflow-hidden"
        style={{ background: `hsl(${hue} 30% 18%)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 60% 25%) 0%, hsl(${(hue + 60) % 360} 40% 15%) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-12 w-12 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
            <svg className="h-5 w-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-rose-500 transition-all" style={{ width: `${movie.progress}%` }} />
        </div>
      </div>
      <div className="mt-2 px-0.5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-100 truncate max-w-[14rem]">{movie.title}</p>
          <p className="text-xs text-slate-500">{movie.progress}% watched</p>
        </div>
      </div>
    </div>
  );
}

function SectionRow({ title, movies }: MovieSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between px-6 sm:px-10">
        <h2 className="text-base font-semibold tracking-tight text-slate-100 sm:text-lg">{title}</h2>
        <button className="text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors">
          See all →
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 sm:px-10 no-scrollbar">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}

function SearchResults({ movies, isFetching, isError, debouncedQuery }: {
  movies: Movie[];
  isFetching: boolean;
  isError: boolean;
  debouncedQuery: string;
}) {
  if (!debouncedQuery) return null;
  return (
    <section className="px-6 sm:px-10">
      <h2 className="mb-4 text-base font-semibold text-slate-100 sm:text-lg">
        Results for <span className="text-rose-400">"{debouncedQuery}"</span>
      </h2>
      {isFetching && <p className="text-sm text-slate-500">Searching…</p>}
      {isError && <p className="text-sm text-red-400">Couldn't load results. Try again.</p>}
      {!isFetching && movies.length === 0 && (
        <p className="text-sm text-slate-500">No movies found.</p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  const isSearching = debouncedQuery.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100">

      {/* ── Navbar ── */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-8">
            <span className="text-xl font-black tracking-tight text-white">
              CINE<span className="text-rose-500">X</span>
            </span>
            <nav className="hidden gap-6 md:flex">
              {["Home", "Movies", "TV Shows", "My List"].map((item) => (
                <button
                  key={item}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Search bar */}
          <div className="relative w-48 sm:w-64">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search movies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm placeholder-slate-500 outline-none transition focus:border-rose-500/60 focus:bg-white/10 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
      </header>

      <main className="pt-16">
        {isSearching ? (
          <div className="py-10">
            <SearchResults
              movies={movies}
              isFetching={isFetching}
              isError={isError}
              debouncedQuery={debouncedQuery}
            />
          </div>
        ) : (
          <>
            {/* ── Hero Banner ── */}
            <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #1a0a2e 0%, #16213e 40%, #0f3460 100%)",
                }}
              />
              {/* Grain overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px 200px",
                }}
              />
              {/* Gradient fade to page */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/80 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative flex h-full flex-col justify-end px-6 pb-20 sm:px-10 md:justify-center md:pb-0">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose-400">
                  Featured Film
                </p>
                <h1 className="max-w-2xl text-5xl font-black leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
                  {FEATURED.title}
                </h1>
                <div className="mt-4 flex items-center gap-4">
                  <StarRating score={FEATURED.vote_average ?? 0} />
                  <span className="h-3 w-px bg-slate-600" />
                  <span className="text-xs text-slate-400">{FEATURED.release_date?.slice(0, 4)}</span>
                  <span className="rounded border border-white/20 px-1.5 py-0.5 text-xs text-slate-300">HD</span>
                </div>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                  {FEATURED.overview}
                </p>
                <div className="mt-8 flex gap-3">
                  <button className="flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-colors">
                    <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Now
                  </button>
                  <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/10 transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    More Info
                  </button>
                </div>
              </div>
            </section>

            {/* ── Content sections ── */}
            <div className="space-y-12 pb-20">

              {/* Continue Watching */}
              <section>
                <div className="mb-4 flex items-center justify-between px-6 sm:px-10">
                  <h2 className="text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
                    Continue Watching
                  </h2>
                  <button className="text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors">
                    See all →
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto px-6 pb-4 sm:px-10 no-scrollbar">
                  {CONTINUE_WATCHING.map((m) => (
                    <ContinueCard key={m.id} movie={m} />
                  ))}
                </div>
              </section>

              <SectionRow title="Trending Now" movies={MOCK_MOVIES.slice(0, 8)} />
              <SectionRow title="Popular Movies" movies={MOCK_MOVIES.slice(2, 10)} />
              <SectionRow title="Top Rated" movies={[...MOCK_MOVIES].reverse().slice(0, 8)} />

              {/* Genres */}
              <section className="px-6 sm:px-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-100 sm:text-lg">Browse by Genre</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
                  {GENRES.map((genre) => {
                    const hue = (genre.id * 7) % 360;
                    return (
                      <button
                        key={genre.id}
                        className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 py-5 text-center transition-all hover:border-white/20 hover:scale-105"
                        style={{ background: `hsl(${hue} 35% 14%)` }}
                      >
                        <span className="text-2xl">{genre.emoji}</span>
                        <span className="text-xs font-semibold text-slate-300">{genre.name}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <SectionRow title="Upcoming Releases" movies={MOCK_MOVIES.slice(1, 9)} />
              <SectionRow title="Recommended for You" movies={MOCK_MOVIES.slice(3, 10)} />

            </div>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-[#0A0A0F] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                CINE<span className="text-rose-500">X</span>
              </span>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Your cinematic universe. Discover, watch, and enjoy the best films from around the world.
              </p>
            </div>
            {[
              {
                heading: "Browse",
                links: ["Movies", "TV Shows", "New Releases", "Top Rated"],
              },
              {
                heading: "Genres",
                links: ["Action", "Drama", "Comedy", "Sci-Fi"],
              },
              {
                heading: "Account",
                links: ["My List", "Settings", "Help", "Sign Out"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {col.heading}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-slate-400 hover:text-white transition-colors">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-600">© 2024 CineX. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-slate-600">
              <button className="hover:text-slate-400 transition-colors">Privacy</button>
              <button className="hover:text-slate-400 transition-colors">Terms</button>
              <button className="hover:text-slate-400 transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Utility style: hide scrollbar globally for carousels */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}