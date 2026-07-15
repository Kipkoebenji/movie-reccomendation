import api from "@/services/api";
import type { MoviesResponse } from "@/types/movies";

export async function getMovies() {
  const response = await api.get<MoviesResponse>("/discover/movie", {
    params: {
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}