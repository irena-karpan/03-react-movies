import css from "../App/App.module.css";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import fetchMovie from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovie = async (movieTopic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

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
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedMovie = (key: Movie) => {
    setSelectedMovie(key);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleMovie} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movie.length > 0 && (
        <MovieGrid onSelect={handleSelectedMovie} movies={movie} />
      )}
      <Toaster />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
