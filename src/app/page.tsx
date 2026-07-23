"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  movieCastOptions,
  moviesOptions,
  popularMoviesOptions,
} from "@/features/movies/queryProvider";
import Header from "@/components/layout/(Header)/Navbar";
import Footer from "@/components/layout/(Footer)/Footer";
import {
  Star,
  Play,
  TrendingUp,
  Flame,
  Clock3,
  Crown,
  ImageOff,
} from "lucide-react";
import Link from "next/link";

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500">
      <ImageOff className="size-10" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  const { data: moviesData } = useQuery(moviesOptions());

  const { data: popularMoviesData } = useQuery(popularMoviesOptions());

  const movies = moviesData?.results ?? [];

  const popularMovies = popularMoviesData?.results ?? [];

  const featuredMovie = popularMovies[0];

  const { data: castMoviesData } = useQuery({
    ...movieCastOptions(featuredMovie?.id ?? 0),
    enabled: Boolean(featuredMovie?.id),
  });

  if (!featuredMovie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <div className="fixed inset-0 -z-10 bg-[url(/_.jpeg)] bg-cover bg-center bg-no-repeat" />
        <div className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm" />
        <section className="mx-auto w-full max-w-4xl mb-20">
          <Header />
        </section>

        <section className="flex mx-auto w-full max-w-4xl">
          <div className="relative flex flex-col md:flex-row items-start gap-8 rounded-3xl bg-neutral-900/70 backdrop-blur-md p-6 md:p-10">
            {/* Poster - overlaps upward out of the card */}
            <div className="relative -mt-16 md:-mt-24 w-full md:w-[320px] shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src={`https://image.tmdb.org/t/p/w500${popularMovies[0]?.poster_path}`}
                alt="Movie Poster"
                width={400}
                height={560}
                className="w-full h-105 md:h-140 object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-white pt-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                {popularMovies[0]?.title}
              </h1>

              <div className="mt-3 flex items-center gap-2">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />

                <span className="font-semibold">
                  {featuredMovie.vote_average.toFixed(1)}
                </span>

                <span className="text-neutral-300 text-sm">
                  ({featuredMovie.vote_count.toLocaleString()} votes)
                </span>
              </div>

              <p className="mt-5 max-w-xl text-neutral-300 leading-relaxed">
                {featuredMovie.overview}
              </p>

              <h3 className="mt-8 text-xl font-semibold">Cast:</h3>
              <div className="mt-3 flex gap-6 overflow-x-auto pb-2">
                {castMoviesData?.cast.slice(0, 3).map((member) => (
                  <div key={member.id} className="w-24 shrink-0 text-center">
                    <div className="relative size-16 overflow-hidden rounded-full">
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

                    <p className="mt-2 truncate text-sm text-white">
                      {member.name}
                    </p>

                    <p className="truncate text-xs text-neutral-400">
                      {member.character}
                    </p>
                  </div>
                ))}

                {castMoviesData && castMoviesData.cast.length === 0 && (
                  <p className="text-sm text-neutral-400">
                    Cast information is unavailable.
                  </p>
                )}
              </div>

              <div className="mt-10 flex items-center gap-6">
                <span className="text-xl font-semibold">Watch</span>
                <Link href={`/movies/${featuredMovie.id}`}>
                  <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-6 py-3 text-sm font-semibold">
                    <Play size={16} fill="white" />
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col mt-10 mx-auto w-full max-w-4xl">
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <TrendingUp className="h-5 w-5" />
              <p className="text-xl font-semibold">Trending</p>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Flame className="h-5 w-5" />
              <p className="text-xl font-semibold">Popular</p>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Clock3 className="h-5 w-5" />
              <p className="text-xl font-semibold">Recent</p>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Crown className="h-5 w-5" />
              <p className="text-xl font-semibold">Premium</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mb-5">
            <button className="rounded-full border border-fuchsia-500 bg-transparent px-6 py-3 text-sm font-semibold text-fuchsia-500 transition-all duration-300 hover:bg-linear-to-r hover:cursor-pointer hover:from-purple-500 hover:to-fuchsia-500 hover:text-white">
              Action
            </button>
            <button className="rounded-full border border-fuchsia-500 bg-transparent px-6 py-3 text-sm font-semibold text-fuchsia-500 transition-all duration-300 hover:bg-linear-to-r hover:cursor-pointer hover:from-purple-500 hover:to-fuchsia-500 hover:text-white">
              Adventure
            </button>
            <button className="rounded-full border border-fuchsia-500 bg-transparent px-6 py-3 text-sm font-semibold text-fuchsia-500 transition-all duration-300 hover:bg-linear-to-r hover:cursor-pointer hover:from-purple-500 hover:to-fuchsia-500 hover:text-white">
              Animation
            </button>
            <button className="rounded-full border border-fuchsia-500 bg-transparent px-6 py-3 text-sm font-semibold text-fuchsia-500 transition-all duration-300 hover:bg-linear-to-r hover:cursor-pointer hover:from-purple-500 hover:to-fuchsia-500 hover:text-white">
              Comedy
            </button>
            <button className="rounded-full border border-fuchsia-500 bg-transparent px-6 py-3 text-sm font-semibold text-fuchsia-500 transition-all duration-300 hover:bg-linear-to-r hover:cursor-pointer hover:from-purple-500 hover:to-fuchsia-500 hover:text-white">
              Fiction
            </button>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl mt-10 px-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
            {movies?.map((movie) => (
              <div key={movie.id} className="flex flex-col items-center">
                <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 200px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 mb-4 w-full text-center text-sm line-clamp-2 leading-snug">
                  {movie.title}
                </p>

                <Link
                  href={`/movies/${movie.id}`}
                  className="w-full flex justify-center"
                >
                  <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-5 py-2.5 text-sm font-semibold whitespace-nowrap">
                    <Play size={16} fill="white" />
                    Play Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
