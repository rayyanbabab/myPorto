import React from "react";

export const ShinyText = ({
  children,
  className = "",
  isLight = false,
}) => {
  return (
    <span
      className={`inline-block font-bold bg-clip-text text-transparent animate-shiny-text transition-all ${
        isLight
          ? "bg-gradient-to-r from-gray-700 via-black to-gray-700"
          : "bg-gradient-to-r from-gray-400 via-white to-gray-400"
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default ShinyText;
