import { useId } from "react";
import css from "./SearchBox.module.css";

export default function SearchBar({ value, onFilter, children }) {
  const searchID = useId();
  return (
    <div className={css.container}>
      <label htmlFor={searchID}>{children}</label>
      <input
        className={css.input}
        id={searchID}
        type="text"
        name="search"
        value={value}
        onChange={(evt) => onFilter(evt.target.value)}
      />
    </div>
  );
}
