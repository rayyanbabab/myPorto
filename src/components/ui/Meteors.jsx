import React, { useMemo } from "react";

export const Meteors = ({ number = 20, className = "" }) => {
  const meteors = useMemo(() => {
    return new Array(number).fill(true).map((_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 80) + "%",
      left: Math.floor(Math.random() * 95) + "%",
      animationDelay: (Math.random() * 1.5 + 0.2).toFixed(2) + "s",
      animationDuration: (Math.random() * 4 + 3).toFixed(1) + "s",
    }));
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((el) => (
        <span
          key={`meteor-${el.id}`}
          className={`animate-meteor-effect absolute h-0.5 w-0.5 rounded-full bg-cyan-200 shadow-[0_0_0_1px_#ffffff20] rotate-[215deg] ${className}`}
          style={{
            top: el.top,
            left: el.left,
            animationDelay: el.animationDelay,
            animationDuration: el.animationDuration,
          }}
        >
          {/* Meteor trail */}
          <span className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-[50%] bg-gradient-to-r from-cyan-300 via-sky-400 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
