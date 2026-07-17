import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Opening = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const counterRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        document.body.style.overflow = 'unset';
        if (onComplete) onComplete();
      }
    });

    gsap.set(containerRef.current, { visibility: "visible" });
    
    const textElement = textContainerRef.current;
    const text = textElement.innerText;
    textElement.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.className = 'inline-block translate-y-full opacity-0';
        textElement.appendChild(span);
    });

    const chars = textElement.children;

    tl.to(counterRef.current, {
        innerText: 100,
        duration: 2,
        snap: { innerText: 1 },
        ease: "expo.inOut",
    }, 0)
    .to(counterRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: "expo.inOut",
    }, 1.6)
    .to(chars, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: "expo.out",
    }, 1.8)
    .to({}, { duration: 0.8 })
    .to(chars, {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "expo.inOut",
    })
    .to(containerRef.current, {
        y: "-100%",
        duration: 1.2,
        ease: "expo.inOut"
    });

    return () => {
        tl.kill();
        document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white invisible"
    >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <div 
                ref={counterRef} 
                className="text-2xl sm:text-3xl font-mono font-medium tracking-widest"
            >
                0
            </div>
        </div>

        <div className="overflow-hidden flex items-center justify-center">
            <h1 
                ref={textContainerRef}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight uppercase overflow-hidden py-2"
            >
                My Portofolio
            </h1>
        </div>
    </div>
  );
};

export default Opening;