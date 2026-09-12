import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

export default async function fetchMovie(movie: string): Promise<Movie[]> {
  //   const myKey = import.meta.env.VITE_TMDB_TOKEN;
  const responce = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: movie,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
  //   console.log(responce.data.results);

  return responce.data.results;
}
