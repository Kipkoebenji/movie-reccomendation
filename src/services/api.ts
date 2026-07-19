import axios from "axios";

const api = axios.create({
  baseURL: "/api",  //it's talking to your own Next.js server, not TMDB. src/app/api/movies/route.ts will handle the request and call TMDB API
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;