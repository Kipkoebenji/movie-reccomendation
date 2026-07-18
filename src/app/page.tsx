"use client";

import Image from "next/image";
import { getMovies } from "@/features/movies/services";
import Header from "@/components/layout/(Header)/Navbar";
import Footer from "@/components/layout/(Footer)/Footer";
import { Star, Play, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const cast = ["/cast1.jpg"];
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data.results ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

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
                <span className="text-xl font-semibold">Watch Trailer</span>
                <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-6 py-3 text-sm font-semibold">
                  <Play size={16} fill="white" />
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl mt-10">
          <p>This will have latest movies</p>

          <div className="flex gap-5 flex-wrap">
            {movies?.map((movie) => (
              <div key={movie.id}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/footer.jpeg"
                  }
                  alt={movie.title}
                  width={200}
                  height={360}
                  className="rounded-lg"
                />
                <p className="m-3.5">{movie.title}</p>
                <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition-opacity px-6 py-3 text-sm font-semibold">
                  <Play size={16} fill="white" />
                  Play Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
