import type { Movie } from "../../types/movie";
import css from "../MovieGrid/MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (element: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((element) => (
        <li key={element.id} onClick={() => onSelect(element)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
              alt={`${element.title}`}
              loading="lazy"
            />
            <h2 className={css.title}>{`${element.title}`}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
