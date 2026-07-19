import { queryOptions } from "@tanstack/react-query";
import {
  getMovies,
  getPopularMovies,
  searchMovies,
} from "./client";

export function movieSearchOptions(query: string) {
  return queryOptions({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
    placeholderData: (previousData) => previousData,
  });
}
