import React, { useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function HolographicProfileCard({
  imageSrc = '/img/rayy.png',
  handle = '@rayyanmf',
  isLight = false,
  className = '',
}) {
  const { isId } = useLanguage();
  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    // Normalizing between -1 and 1
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    const maxTilt = 14;
    setTilt({
      x: -normY * maxTilt,
      y: normX * maxTilt,
    });
    setPointer({ x: percentX, y: percentY });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setPointer({ x: 50, y: 50 });
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Outer ambient glow reacting to hover */}
      <div
        className={`absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-80' : 'opacity-20'
        } ${
          isLight
            ? 'bg-gradient-to-tr from-cyan-400/20 via-purple-400/20 to-amber-300/20'
            : 'bg-gradient-to-tr from-cyan-500/25 via-indigo-600/30 to-fuchsia-500/25'
        }`}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-[300px] sm:w-[340px] md:w-[370px] h-[420px] sm:h-[460px] md:h-[490px] rounded-[2rem] p-3 transition-transform duration-200 ease-out cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
            isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
          }`,
          boxShadow: isHovered
            ? isLight
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(0,0,0,0.85), 6px 6px 0px 0px rgba(0,0,0,1)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 2px rgba(255,255,255,0.7), 6px 6px 0px 0px rgba(255,255,255,0.3)'
            : isLight
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0,0,0,0.8), 4px 4px 0px 0px rgba(0,0,0,1)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(255,255,255,0.2), 4px 4px 0px 0px rgba(255,255,255,0.1)',
          background: isLight
            ? 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)'
            : 'linear-gradient(145deg, #16181f 0%, #0a0c10 100%)',
        }}
      >
        {/* Inner Card Shell with 3D Depth */}
        <div
          className="relative w-full h-full rounded-[1.6rem] overflow-hidden border transition-colors duration-300"
          style={{
            borderColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
            transform: 'translateZ(15px)',
          }}
        >
          {/* Avatar Photo */}
          <img
            src={imageSrc}
            alt="Rayyan Ammar Fadhillah"
            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 filter"
            style={{
              filter: isHovered ? 'grayscale(0%) contrast(105%)' : 'grayscale(35%) contrast(100%)',
            }}
          />

          {/* Holographic Foil Layer (Rainbow Sheen) */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.65 : 0.15,
              mixBlendMode: 'color-dodge',
              background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.8) 0%, transparent 25%),
                linear-gradient(${115 + tilt.y * 2}deg,
                  rgba(255, 0, 102, 0.25) 0%,
                  rgba(255, 153, 0, 0.25) 20%,
                  rgba(255, 238, 0, 0.25) 40%,
                  rgba(0, 234, 141, 0.25) 60%,
                  rgba(0, 153, 255, 0.25) 80%,
                  rgba(187, 0, 255, 0.25) 100%)`,
              backgroundSize: '150% 150%',
            }}
          />

          {/* Holographic Prismatic Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0.1,
              backgroundImage: `repeating-linear-gradient(
                ${45 + tilt.x}deg,
                rgba(255,255,255,0.15) 0px,
                rgba(255,255,255,0.15) 2px,
                transparent 2px,
                transparent 6px
              )`,
            }}
          />

          {/* Specular Glare Reflection */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.8 : 0,
              mixBlendMode: 'overlay',
              background: `radial-gradient(circle 320px at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)`,
            }}
          />

          {/* Top Foil Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-sm ${
                isLight
                  ? 'bg-white/80 text-black border-black/20'
                  : 'bg-black/80 text-white border-white/20'
              }`}
            >
              <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>COLLECTOR // V2.6</span>
            </div>

            <div
              className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest backdrop-blur-md border ${
                isLight
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-white'
              }`}
            >
              <span>FOIL #001</span>
            </div>
          </div>

          {/* Bottom Interactive Glass Deck */}
          <div
            className="absolute bottom-4 inset-x-4 z-20 rounded-2xl p-3.5 backdrop-blur-xl border transition-all duration-300"
            style={{
              background: isLight
                ? 'rgba(255, 255, 255, 0.88)'
                : 'rgba(10, 12, 16, 0.85)',
              borderColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
              boxShadow: isLight
                ? '0 10px 30px rgba(0,0,0,0.08)'
                : '0 15px 35px rgba(0,0,0,0.5)',
              transform: 'translateZ(25px)',
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <span className={`text-sm font-black font-mono tracking-tight truncate ${
                  isLight ? 'text-black' : 'text-white'
                }`}>
                  {handle}
                </span>

                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {isId ? 'Siap Kolaborasi' : 'Available for Work'}
                  </span>
                </div>
              </div>

              {/* Hire Me / Contact CTA Button */}
              <button
                type="button"
                onClick={handleContactClick}
                className={`group/btn relative px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 ${
                  isLight
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <span>{isId ? 'Kontak' : 'Hire Me'}</span>
                <ArrowUpRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
