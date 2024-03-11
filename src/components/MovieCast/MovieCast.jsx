import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../service/api-movies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchMovieCredits() {
      try {
        const { cast } = await getMovieCredits(movieId);
        setCast(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCredits();
  }, [movieId]);

  return (
    <>
      {cast.length !== 0 && (
        <div className={css.container}>
          <h2>Movie Cast</h2>
          <ul className={css.list}>
            {cast.map((actor) => (
              <li key={actor.id}>
                <img
                  width="200px"
                  height="300px"
                  src={
                    actor.profile_path &&
                    `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  }
                  alt={actor.original_name}
                />
                <p className={css.text}>
                  {actor.name} - {actor.character}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cast.length === 0 && (
        <div>We don`&#39;`t have any cast for this movie.</div>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}
