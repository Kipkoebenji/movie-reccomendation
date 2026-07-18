import { queryOptions } from '@tanstack/react-query'
import { useQuery } from "@tanstack/react-query";
import { MoviesResponse } from "./types";
import { getMovies, searchMovies } from "./services";

  const { data } = useQuery<MoviesResponse>({
    queryKey: ["movies"],
    queryFn: () => getMovies()
  });

export function movieSearchOptions(query: string) {
  return queryOptions({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
    placeholderData: (previousData) => previousData,
  });
}