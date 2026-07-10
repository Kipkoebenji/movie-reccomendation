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
import { MovieCard } from "@/components/ui/MovieCard";


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
        <section className="mx-auto w-full max-w-4xl mb-20">
          <Header />
                    
        </section>

        <section className="flex w-full max-w-4xl">
          
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

        </section>

        <section>
          <h1>This is the next section</h1>
          {movies[0] ? <MovieCard movie={movies[0]} /> : null}
        </section>

        <section>
          
            <p>This will have latest news</p>
          
        </section>

      </main>

      <Footer />
    </>
  );
}
