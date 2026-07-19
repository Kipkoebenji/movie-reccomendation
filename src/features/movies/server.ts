import tmdbApi from "@/services/tmdbApi";
import type { MoviesResponse } from "@/features/movies/types";
import type { SearchMoviesResponse } from "@/features/movies/types";

export async function getMovies() {
  const response = await tmdbApi.get<MoviesResponse>("/discover/movie", {
    params: {
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}

export const searchMovies = async (query: string) => {
  const response = await tmdbApi.get<SearchMoviesResponse>("/search/movie", {
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
  const response = await tmdbApi.get(`/movie/${params.id}`);
  return response.data;
}

export async function getPopularMovies() {
  const response = await tmdbApi.get<MoviesResponse>("/movie/popular", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}
