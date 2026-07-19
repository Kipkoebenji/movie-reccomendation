import api from "@/services/api";
import type { MoviesResponse, SearchMoviesResponse } from "./types";

export async function getMovies() {
  const response = await api.get<MoviesResponse>("/movies");
  return response.data;
}

export async function getPopularMovies() {
  const response = await api.get<MoviesResponse>("/movies/popular");
  return response.data;
}

export const searchMovies = async (query: string) => {
  const response = await api.get<SearchMoviesResponse>("/movies/search", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
};

export async function getMovieDetails(params: { id: number }) {
  const response = await api.get(`/movies/${params.id}`);
  return response.data;
}