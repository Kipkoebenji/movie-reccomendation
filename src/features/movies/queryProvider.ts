import { queryOptions } from "@tanstack/react-query";
import { searchMovies } from "./services";

export function movieSearchOptions(query: string) {
  return queryOptions({
    queryKey: ["movies", "search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
    placeholderData: (previousData) => previousData,
  });
}
