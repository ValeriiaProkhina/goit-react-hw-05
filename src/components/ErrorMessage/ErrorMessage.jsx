import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <p className={css.text}>
      Error! Something is not right! <span>{message}</span>Refresh the page!
    </p>
  );
}
