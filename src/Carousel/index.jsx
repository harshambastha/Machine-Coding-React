import { useState } from "react";
import "./styles.css";

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

  const next = () => {
    setIndex((i) => Math.min(i + 1, items.length - 1));
  };

  return (
    <div className="carousel">
      <button onClick={prev} disabled={index === 0}>
        ◀
      </button>

      <div className="viewport">
        <div
          className="track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div className="slide" key={i}>
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
