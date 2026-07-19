import { queryOptions } from "@tanstack/react-query";
import { getMovieDetails, getMovies, getPopularMovies, searchMovies } from "./client";
import type { SearchMoviesResponse } from "./types";

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
  return queryOptions({
    queryKey: ["movies", "details", id],
    queryFn: () => getMovieDetails({ id }),
  });
}
