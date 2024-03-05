import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import css from "./Contact.module.css";

export default function Contact({ contact: { id, name, number }, onDelete }) {
  return (
    <li className={css.listItem}>
      <div className={css.itemInfo}>
        <p>
          <IoPersonSharp size="14" />
          <span className={css.text}>{name}</span>
        </p>
        <p>
          <FaPhone size="14" />
          <span className={css.text}>{number}</span>
        </p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}
