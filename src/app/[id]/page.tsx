"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Play,
  Download,
  Star,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react";

interface MovieDetailsProps {
  title: string;
  year: number;
  certification: string; // e.g. "R"
  country: string;
  genres: string[];
  posterUrl: string;
  trailerUrl: string;
  rating: number; // out of 10
  ratingCount: number;
}

const DEFAULT_MOVIE: MovieDetailsProps = {
  title: "eGagasini",
  year: 2026,
  certification: "R",
  country: "South Africa",
  genres: ["Drama"],
  posterUrl: "/main.jpeg",
  trailerUrl: "/trailer.mp4",
  rating: 6.0,
  ratingCount: 0,
};

export default function MovieDetails(props: Partial<MovieDetailsProps> = {}) {
  const {
    title,
    year,
    certification,
    country,
    genres,
    posterUrl,
    trailerUrl,
    rating,
    ratingCount,
  } = { ...DEFAULT_MOVIE, ...props };

  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  return (
    <main className="min-h-dvh bg-black">
      <div
        data-slot="hero"
        className="relative min-h-dvh overflow-hidden rounded-3xl bg-black"
      >
        {/* Backdrop video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={trailerUrl} type="video/mp4" />
        </video>

        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-black/40" />

        {/* Mute toggle */}
        <button
          data-slot="mute-toggle"
          onClick={toggleMute}
          aria-label={muted ? "Unmute trailer" : "Mute trailer"}
          className="absolute top-6 right-6 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/10 transition hover:bg-black/70"
        >
          {muted ? (
            <VolumeX className="size-4.5" />
          ) : (
            <Volume2 className="size-4.5" />
          )}
        </button>

        {/* Rating panel — pinned right, vertical divider */}
        <div
          data-slot="rating-panel"
          className="absolute inset-y-0 right-0 z-20 hidden w-40 items-center justify-center border-l border-white/15 bg-linear-to-l from-black/40 to-transparent sm:flex"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <Star className="size-6 fill-amber-400 text-amber-400" />
              <span className="text-3xl font-bold text-white">
                {rating.toFixed(1)}
                <span className="ml-0.5 text-sm font-normal text-white/50">
                  /10
                </span>
              </span>
            </div>
            <span className="text-xs text-white/50">
              {ratingCount} people rated
            </span>
          </div>
        </div>

        {/* Bottom content block */}
        <div
          data-slot="content"
          className="absolute inset-x-0 bottom-0 z-10 flex items-end gap-5 p-6 sm:p-8"
        >
          {/* Poster thumbnail, docked to bottom edge */}
          <div className="relative hidden w-28 shrink-0 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 sm:block sm:w-36">
            <Image
              src={posterUrl}
              alt={`${title} poster`}
              width={144}
              height={216}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/60">
                <span>{year}</span>
                <span className="text-white/30">|</span>
                <span className="rounded border border-white/30 px-1 text-xs">
                  {certification}
                </span>
                <span className="text-white/30">|</span>
                <span>{country}</span>
                <span className="text-white/30">|</span>
                <span>{genres.join(", ")}</span>
              </div>
            </div>

            {/* CTAs + share row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button className="flex items-center gap-2 rounded-lg bg-linear-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110">
                <Play className="size-4 fill-black" />
                Watch Trailer
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/15 transition hover:bg-white/20">
                <Download className="size-4" />
                More Info
              </button>

              <div className="ml-auto flex items-center gap-2 sm:ml-2">
                <ShareIcon icon={<ExternalLink className="size-4" />} />
                <ShareIcon label="F" />
                <ShareIcon label="T" />
                <ShareIcon label="in" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShareIcon({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      aria-label="Share"
      className="flex size-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/15 transition hover:bg-white/20"
    >
      {icon ?? label}
    </button>
  );
}
