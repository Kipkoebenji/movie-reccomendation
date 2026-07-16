import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { searchMovies } from "@/features/movies/services";
import type { Movie } from "@/features/movies/types";

export default function Header() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  const showDropdown = isOpen && searchQuery.trim().length > 0;

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // reset highlighted index whenever results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [movies]);

  function goToMovie(movie: Movie) {
    setIsOpen(false);
    setSearchQuery("");
    router.push(`/movies/${movie.id}`);
  }

  function goToSearchResults(query: string) {
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, movies.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && movies[activeIndex]) {
        goToMovie(movies[activeIndex]);
      } else if (searchQuery.trim()) {
        goToSearchResults(searchQuery.trim());
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <header className="text-white pt-3">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div>
            <Image className="bg-white rounded-full" width={50} height={50} src="/logo.png" alt="Logo" />
          </div>

          <div ref={containerRef} className="relative w-full ml-4 mr-7.5">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="w-full h-15 border text-white border-white/10 rounded-3xl p-0.5 pl-3.5"
            />

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-xl z-50">
                {isFetching && movies.length === 0 && (
                  <div className="px-4 py-3 text-sm text-white/50">Searching…</div>
                )}

                {isError && (
                  <div className="px-4 py-3 text-sm text-red-400">Something went wrong.</div>
                )}

                {!isFetching && !isError && movies.length === 0 && debouncedQuery.length > 0 && (
                  <div className="px-4 py-3 text-sm text-white/50">No results for "{debouncedQuery}"</div>
                )}

                {movies.map((movie, index) => (
                  <button
                    key={movie.id}
                    onClick={() => goToMovie(movie)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                      index === activeIndex ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{movie.title}</p>
                      {movie.release_date && (
                        <p className="text-xs text-white/50">{movie.release_date.slice(0, 4)}</p>
                      )}
                    </div>
                  </button>
                ))}

                {movies.length > 0 && (
                  <button
                    onClick={() => goToSearchResults(searchQuery.trim())}
                    className="w-full border-t border-white/10 px-4 py-2 text-left text-sm text-white/60 hover:bg-white/5"
                  >
                    See all results for "{searchQuery.trim()}"
                  </button>
                )}
              </div>
            )}
          </div>

          <button className="hover:underline">Login</button>
        </div>

        <div className={`flex flex-row justify-end gap-4 py-2} isFetching ? "display: none" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">TV Shows</a>
        </div>
      </div>
    </header>
  );
}