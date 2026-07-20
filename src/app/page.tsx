"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  moviesOptions,
  popularMoviesOptions,
} from "@/features/movies/queryProvider";
import Header from "@/components/layout/(Header)/Navbar";
import Footer from "@/components/layout/(Footer)/Footer";
import { Star, Play, Ticket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const cast = ["/cast1.jpg"];


 const { data: moviesData } = useQuery(moviesOptions());

const { data: popularMoviesData } = useQuery(popularMoviesOptions());

const movies = moviesData?.results ?? [];

const popularMovies = popularMoviesData?.results ?? [];

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
                  {popularMovies[0]?.vote_average.toFixed(1)}
                </span>

                <span className="text-neutral-300 text-sm">
                  ({popularMovies[0]?.vote_count.toLocaleString()} votes)
                </span>
              </div>

              <p className="mt-5 max-w-xl text-neutral-300 leading-relaxed">
                {popularMovies[0]?.overview}
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
                      alt="Cast member"
                      fill
                      sizes="44px"
                      className="object-cover m-1"
                    />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full ring-2 ring-neutral-900 bg-neutral-900 border border-pink-500 flex items-center justify-center text-pink-400 text-xs font-semibold ml-5">
                  5+
                </div>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <span className="text-xl font-semibold">Watch</span>
                <Link href={`/movies/${popularMovies[0]?.id}`}>
                <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-6 py-3 text-sm font-semibold">
                  <Play size={16} fill="white" />
                  Play Now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl mt-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-start md:items-start md:gap-5">
            {movies?.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col items-center md:items-start"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={360}
                  className="rounded-lg"
                />

                <p className="mt-3 mb-4 text-center md:text-left">
                  {movie.title}
                </p>

                 <Link href={`/movies/${movie.id}`}> 
                <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-6 py-3 text-sm font-semibold">
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
