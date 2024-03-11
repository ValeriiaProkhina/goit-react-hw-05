import { ThreeCircles } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.container}>
      <ThreeCircles
        visible={true}
        height="70"
        width="70"
        color="#0075e2"
        ariaLabel="three-circles-loading"
      />
    </div>
  );
}
