import React from "react";

export const BorderBeam = ({
  className = "",
  size = 200,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#38bdf8",
  colorTo = "#a855f7",
}) => {
  return (
    <div
      style={{
        padding: `${borderWidth}px`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
    >
      {/* Rotating beam element positioned at center with large dimensions */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-border-beam origin-center"
        style={{
          width: "300%",
          height: "300%",
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${colorFrom} 320deg, ${colorTo} 360deg)`,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
};

export default BorderBeam;
