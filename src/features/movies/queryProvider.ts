import { useQuery } from "@tanstack/react-query";
import { Movie } from "./types";
import { getMovies, searchMovies } from "./services";

  const { data } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: () => getMovies()
  });