import React from "react";
import "./keyboard.css";

export default function Keyboard({ nextChar, pressedChar, isMistype }) {
  return (
    <div className="Keyboard">
      <div className="KeysRow">
        {"qwertyuiop".split("").map((key) => (
          <div
            key={key}
            id={
              key === pressedChar
                ? isMistype
                  ? "PressedKeyFalse"
                  : "PressedKeyTrue"
                : ""
            }
            className={key === nextChar ? "KeyToPress Key" : "Key"}
          >
            {key}
          </div>
        ))}
      </div>

      <div className="KeysRow">
        {"asdfghjkl".split("").map((key) => (
          <div
            key={key}
            id={
              key === pressedChar
                ? isMistype
                  ? "PressedKeyFalse"
                  : "PressedKeyTrue"
                : ""
            }
            className={key === nextChar ? "KeyToPress Key" : "Key"}
          >
            {key}
          </div>
        ))}
      </div>

      <div className="KeysRow">
        {"zxcvbnm".split("").map((key) => (
          <div
            key={key}
            id={
              key === pressedChar
                ? isMistype
                  ? "PressedKeyFalse"
                  : "PressedKeyTrue"
                : ""
            }
            className={key === nextChar ? "KeyToPress Key" : "Key"}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
}
