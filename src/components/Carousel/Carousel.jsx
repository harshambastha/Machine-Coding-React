import { useState } from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

  const next = () => {
    setIndex((i) => Math.min(i + 1, items.length - 1));
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prev} disabled={index === 0}>
        ◀
      </button>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div className={styles.slide} key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button onClick={next} disabled={index === items.length - 1}>
        ▶
      </button>
    </div>
  );
}
