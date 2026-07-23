import api from "@/services/api";
import type {
  CastResponse,
  GenresResponse,
  Movie,
  MoviesResponse,
  SearchMoviesResponse,
  SimilarMoviesResponse,
} from "./types";

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
  const response = await api.get<Movie>(`/movies/${params.id}`);
  return response.data;
}

export async function getGenreMovies() {
  const response = await api.get<GenresResponse>("/movies/genre", {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}

export async function getUpcomingMovies() {
  const response = await api.get<MoviesResponse>("/movies/upcoming", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}

export async function getTopRatedMovies() {
  const response = await api.get<MoviesResponse>("/movies/topRated", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}

export async function getCast(params: { id: number }) {
  const response = await api.get<CastResponse>(`/movies/${params.id}/cast`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}

export async function getSimilarMovies(params: { id: number }) {
  const response = await api.get<SimilarMoviesResponse>(
    `/movies/${params.id}/similar`,
    {
      params: {
        language: "en-US",
        page: 1,
      },
    },
  );

  return response.data;
}
