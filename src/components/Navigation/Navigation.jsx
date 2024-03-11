import { NavLink } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
export default function Navigation() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <BiCameraMovie size="26" fill="#fbf8f8" />
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movie" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </header>
    </div>
  );
}
