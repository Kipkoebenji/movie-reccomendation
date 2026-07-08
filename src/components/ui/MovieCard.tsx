"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export interface Movie {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string | null
  vote_average: number
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

export function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "TBA"

  return (
    <Card
      className="group/movie relative overflow-hidden rounded-2xl border-0 bg-neutral-900/70 p-0 ring-1 ring-white/10 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:ring-pink-500/40"
    >
      {/* Poster */}
      <div className="relative aspect-2/3 w-full overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover/movie:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-xs text-neutral-500">
            No poster
          </div>
        )}

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-yellow-400 backdrop-blur-sm">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <CardContent className="px-4 pb-3 pt-0 -mt-8 relative">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs text-neutral-400">{year}</p>
      </CardContent>

      {/* Hover overlay with overview, shown on hover only */}
      <CardFooter className="pointer-events-none absolute inset-0 flex items-end border-0 bg-black/80 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/movie:opacity-100">
        <p className="line-clamp-4 text-xs leading-5 text-neutral-200">
          {movie.overview || "No overview available."}
        </p>
      </CardFooter>
    </Card>
  )
}