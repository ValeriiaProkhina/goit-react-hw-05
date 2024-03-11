import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovie } from "../../service/api-movies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchReviewsMovie() {
      try {
        const { results } = await getReviewsMovie(movieId);
        setReviews(results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviewsMovie();
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 && (
        <div className={css.container}>
          <h2>Movie Reviews</h2>
          <ul className={css.list}>
            {reviews.map((review) => (
              <li key={review.id}>
                <p className={css.author}>{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reviews.length === 0 && (
        <div>We don`&#39;`t have any reviews for this movie.</div>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}
