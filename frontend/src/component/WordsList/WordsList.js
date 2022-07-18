import React from "react";
import "./wordslist.css";

export default function WordsList({ stack, currentIndex }) {
  return (
    <div className="WordsList">
      {stack.map((word, i) => (
        <span key={word + i} className="Word">
          {word.split("").map((char, j) => (
            <span
              className={
                i === 0
                  ? j === currentIndex
                    ? "CurrentChar"
                    : j < currentIndex
                      ? "CompletedChar"
                      : ""
                  : ""
              }
              key={j + char}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
