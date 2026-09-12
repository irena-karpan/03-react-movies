import type { Movie } from "../../types/movie";
import css from "../MovieGrid/MovieGrid.module.css";

interface MovieGridProps {
  //   onSelect: () => void;
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((element) => (
        <li key={element.id}>
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
