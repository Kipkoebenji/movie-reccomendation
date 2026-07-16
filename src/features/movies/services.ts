import api from "@/services/api";
import type { MoviesResponse } from "@/features/movies/types";

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

export async function getMovieDetails(params: { id: number }) {
  const response = await api.get(`/movie/${params.id}`);
  return response.data;
}