import React, { useRef, useEffect } from "react";

/**
 * Pure CSS/JS floating particles - no Three.js needed.
 * Renders N small orbs that drift upward with random timing/positions.
 */
const FloatingParticles = ({ count = 20, isLight = false, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 1.5;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 10 + 8;
      const opacity = Math.random() * 0.4 + 0.1;

      Object.assign(particle.style, {
        position: "absolute",
        width: size + "px",
        height: size + "px",
        borderRadius: "50%",
        left: left + "%",
        bottom: "-10px",
        background: isLight
          ? `rgba(0,0,0,${opacity})`
          : `rgba(255,255,255,${opacity})`,
        animation: `floatUp ${duration}s ${delay}s ease-in infinite`,
        pointerEvents: "none",
      });

      container.appendChild(particle);
    }
  }, [count, isLight]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;
