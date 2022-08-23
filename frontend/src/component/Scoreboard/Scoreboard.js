import React from "react";
import "./scoreboard.css";

export default function Scoreboard({ delay, score, multiplier }) {
  return (
    <div className="ScoreBoard">
      <div style={{ display: "flex", width: "50%", justifyContent: "flex-start" }}>
        <div className="ScoreBox">
          <span>{score}</span>
          <p className="label">SCORE</p>
        </div>
      </div>

      <div style={{ display: "flex", width: "50%", justifyContent: "flex-end" }}>
        <div className="MultiplierBox">
          <p>{multiplier}X</p>
        </div>
      </div>

    </div>
  );
}
