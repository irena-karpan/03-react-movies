// import css from "../App/App.module.css";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import fetchMovie from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";

export default function App() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMovie = async (movieTopic: string) => {
    setIsLoading(true);

    if (movieTopic === "") {
      setIsLoading(false);
      toast.error("Please enter your search query.");
      return;
    }

    const responce = await fetchMovie(movieTopic);
    setIsLoading(false);
    if (responce.length === 0) {
      toast.error("No movies found for your request.");
      return;
    }

    setMovie(responce);
  };

  return (
    <>
      <SearchBar onSubmit={handleMovie} />
      {isLoading && <Loader />}
      {movie.length > 0 && <MovieGrid movies={movie} />}
      <Toaster />
    </>
  );
}
