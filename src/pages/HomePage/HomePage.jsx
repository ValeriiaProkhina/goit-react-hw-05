import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../service/api-movies";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchMovies() {
      try {
        setError(false);
        setMovies([]);
        const { results } = await getTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <h1 className={css.title}>Trending today</h1>
      <MovieList movieList={movies} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
