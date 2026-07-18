import api from "@/services/api";
import type { MoviesResponse } from "@/features/movies/types";
import type { SearchMoviesResponse } from "@/features/movies/types";

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


export async function getMovieDetails(params: { id: number }) {
  const response = await api.get(`/movie/${params.id}`);
  return response.data;
}

export async function getPopularMovies() {
  const response = await api.get<MoviesResponse>("/movie/popular", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}
