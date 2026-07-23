import tmdbApi from "@/services/tmdbApi";
import type {
  CastResponse,
  GenresResponse,
  Movie,
  MoviesResponse,
  SearchMoviesResponse,
  SimilarMoviesResponse,
} from "@/features/movies/types";

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
  const response = await tmdbApi.get<Movie>(`/movie/${params.id}`);
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

export async function getGenreMovies() {
  const response = await tmdbApi.get<GenresResponse>("/genre/movie/list", {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}

export async function getUpcomingMovies() {
  const response = await tmdbApi.get<MoviesResponse>("/movie/upcoming", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}

export async function getTopRatedMovies() {
  const response = await tmdbApi.get<MoviesResponse>("/movie/top_rated", {
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}

export async function getCast(params: { id: number }) {
  const response = await tmdbApi.get<CastResponse>(
    `/movie/${params.id}/credits`,
    {
      params: {
        language: "en-US",
      },
    },
  );

  return response.data;
}

export async function getSimilarMovies(params: { id: number }) {
  const response = await tmdbApi.get<SimilarMoviesResponse>(
    `/movie/${params.id}/similar`,
    {
      params: {
        language: "en-US",
        page: 1,
      },
    },
  );

  return response.data;
}
