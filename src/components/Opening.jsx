import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Opening = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        document.body.style.overflow = "unset";
        if (onComplete) onComplete();
      },
    });

    gsap.set(containerRef.current, { visibility: "visible" });

    const textElement = textContainerRef.current;
    if (textElement) {
      const text = textElement.innerText;
      textElement.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.className = "inline-block translate-y-full opacity-0";
        textElement.appendChild(span);
      });
    }

    const chars = textElement ? textElement.children : [];

    // Counter animation 0 to 100
    tl.to(
      counterRef.current,
      {
        innerText: 100,
        duration: 1.6,
        snap: { innerText: 1 },
        ease: "power2.inOut",
      },
      0
    )
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 1.6,
          ease: "power2.inOut",
        },
        0
      )
      // Fade out counter & progress bar
      .to(
        [counterRef.current, progressBarRef.current],
        {
          y: -25,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        1.5
      )
      // Reveal title text chars
      .to(
        chars,
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "expo.out",
        },
        1.7
      )
      // Hold briefly
      .to({}, { duration: 0.5 })
      // Slide chars out
      .to(chars, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "expo.inOut",
      })
      // Smooth curtain reveal
      .to(containerRef.current, {
        y: "-100%",
        duration: 0.9,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white invisible select-none font-sans"
    >
      {/* Counter & Progress bar */}
      <div className="absolute flex flex-col items-center gap-3">
        <div className="flex items-baseline gap-1">
          <span
            ref={counterRef}
            className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white"
          >
            0
          </span>
          <span className="text-sm font-mono text-neutral-500 font-semibold">%</span>
        </div>
        <div className="w-40 sm:w-56 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-white origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Title Text */}
      <div className="overflow-hidden flex items-center justify-center px-4">
        <h1
          ref={textContainerRef}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase overflow-hidden py-3 font-heading"
        >
          Rayyan Portfolio
        </h1>
      </div>
    </div>
  );
};

export default Opening;