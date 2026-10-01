import React, { useState, useRef } from "react";

const CHARS = "ABCDEF012345!<>-_\\/[]{}—=+*^?#";

export const TextScramble = ({
  children,
  className = "",
  scrambleSpeed = 25,
}) => {
  const [displayText, setDisplayText] = useState(children);
  const isHovered = useRef(false);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
    if (typeof children !== "string") return;
    isHovered.current = true;
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        children
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return children[index];
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    clearInterval(intervalRef.current);
    setDisplayText(children);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-default font-mono transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
