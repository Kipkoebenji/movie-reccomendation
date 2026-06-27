import api from "./api";
import type { SearchMoviesResponse } from "@/types/movies";

export const searchMovies = async (query: string) => {
  const response = await api.get<SearchMoviesResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
};
