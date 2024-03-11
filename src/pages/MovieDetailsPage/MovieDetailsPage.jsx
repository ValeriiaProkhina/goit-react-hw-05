// import { useEffect } from "react";
// import { getMovieDetails } from "../../api/api-movies";

import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../../service/api-movies";
import { useState, useEffect, useRef, Suspense } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    setIsLoading(true);
    async function fetchMovieDetails() {
      try {
        setError(false);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);
  console.log(movie);
  return (
    <section>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={css.container}>
        <img
          className={css.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "../../defaultImg/preview.jpg"
          }
          alt={movie.name}
          width="200"
          height="300"
        />
        <div className={css.description}>
          <div>
            <h3 className={css.title}>{movie.original_title}</h3>
            {movie.release_date && (
              <p className={css.text}>{movie.release_date.slice(0, 4)}</p>
            )}

            <h4>Genres</h4>
            {movie.genres && (
              <p className={css.text}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
            <h4 className={css.subtitle}>Production countries</h4>
            {movie.production_countries && (
              <p className={css.text}>
                {movie.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className={css.overview}>
            <h4>Overview</h4>
            <p className={css.text}>{movie.overview}</p>
          </div>
        </div>
      </div>

      <ul className={css.list}>
        <li className={css.item}>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </section>
  );
}
