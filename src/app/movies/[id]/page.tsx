"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Star, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";
import { getMovieDetails } from "@/features/movies/services";
import type { Movie } from "@/features/movies/types";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
  if (!id) return;

  const fetchMovie = async () => {
    try {
      const data = await getMovieDetails({
        id: Number(id),
      });

      setMovie(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchMovie();
}, [id]);

if (!movie) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </main>
  );
}

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muted}
        className="w-full h-full object-cover"
      >
        <source src="/trailer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-end p-8">
        <h1 className="text-4xl font-bold text-white mb-4">{movie?.title}</h1>
        <p className="text-white mb-4">{movie?.overview}</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? "Unmute" : "Mute"}
          </button>
          <ShareIcon icon={<ExternalLink size={16} />} label="Share" />
        </div>
      </div>
    </div>
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
