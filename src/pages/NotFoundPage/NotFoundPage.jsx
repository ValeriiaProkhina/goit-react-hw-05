import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <Link to="/">Back to home page!</Link>
      <p>Page not found!</p>
    </div>
  );
}
