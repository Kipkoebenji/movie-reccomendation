import { useQuery } from "@tanstack/react-query";
import { MoviesResponse } from "./types";
import { getMovies, searchMovies } from "./services";

  const { data } = useQuery<MoviesResponse>({
    queryKey: ["movies"],
    queryFn: () => getMovies()
  });