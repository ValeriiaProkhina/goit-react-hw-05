import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movieList }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movieList.map((movie) => (
        <li className={css.item} key={movie.id}>
          <Link
            className={css.link}
            to={`/movies/${movie.id}`}
            state={location}
          >
            <div className={css.overlay}></div>
            <div className={css.container}>
              <img
                className={css.img}
                src={
                  movie.poster_path &&
                  `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                }
                alt={movie.name}
                width="200"
                height="360"
              />
              <p className={css.title}>{movie.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
