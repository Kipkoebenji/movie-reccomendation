import { queryOptions } from "@tanstack/react-query";
import {
  getCast,
  getGenreMovies,
  getMovieDetails,
  getMovies,
  getPopularMovies,
  getSimilarMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "./client";
import type {
  CastResponse,
  GenresResponse,
  Movie,
  SearchMoviesResponse,
  SimilarMoviesResponse,
} from "./types";

export function movieSearchOptions(query: string) {
  return queryOptions<SearchMoviesResponse>({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
    placeholderData: (previousData) => previousData,
  });
}

export function moviesOptions() {
  return queryOptions({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}

export function popularMoviesOptions() {
  return queryOptions({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });
}

export function movieDetailsOptions(id: number) {
  return queryOptions<Movie>({
    queryKey: ["movies", "details", id],
    queryFn: () => getMovieDetails({ id }),
  });
}

export function movieCastOptions(id: number) {
  return queryOptions<CastResponse>({
    queryKey: ["movies", "cast", id],
    queryFn: () => getCast({ id }),
  });
}

export function similarMoviesOptions(id: number) {
  return queryOptions<SimilarMoviesResponse>({
    queryKey: ["movies", "similar", id],
    queryFn: () => getSimilarMovies({ id }),
  });
}

export function movieGenreOptions() {
  return queryOptions<GenresResponse>({
    queryKey: ["movies", "genre"],
    queryFn: () => getGenreMovies(),
  });
}

export function topRatedMoviesOptions() {
  return queryOptions({
    queryKey: ["movies", "topRated"],
    queryFn: () => getTopRatedMovies(),
  });
}

export function upcomingMoviesOptions() {
  return queryOptions({
    queryKey: ["movies", "upcoming"],
    queryFn: () => getUpcomingMovies(),
  });
}
