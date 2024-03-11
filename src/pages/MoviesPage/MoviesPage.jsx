import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovies } from "../../service/api-movies";
import MovieList from "../../components/MovieList/MovieList";
import { Field, Formik, Form } from "formik";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  const movieQuery = params.get("query") ?? "";

  useEffect(() => {
    setIsLoading(true);
    async function fetchSearchMovie() {
      try {
        const { results } = await getSearchMovies(movieQuery);
        setMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSearchMovie();
  }, [movieQuery]);

  const handleSearchMovie = (values, actions) => {
    if (values.query.trim() === "") {
      alert("Please enter movie!");
      return;
    }
    setError(false);
    setMovies([]);
    params.set("query", values.query.trim());
    setParams(params);
    actions.resetForm();
  };

  return (
    <>
      <div>
        <Formik initialValues={{ query: "" }} onSubmit={handleSearchMovie}>
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="query"
              placeholder="Search your movie"
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
      <MovieList movieList={movies} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}
