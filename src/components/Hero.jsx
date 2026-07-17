import React, { useRef, useState, useEffect, Suspense } from "react";
import Hero3DBackground from "./Hero3DBackground";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  const themeStyles = {
    dark: {
      bg: 'linear-gradient(135deg, #040507 0%, #0a0d12 50%, #050608 100%)',
      halo: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.12) 16%, rgba(255,255,255,0) 42%), radial-gradient(circle at 68% 66%, rgba(255,214,170,0.12) 0%, rgba(255,214,170,0) 55%)',
      vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)',
      heading: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
      secondary: 'rgba(255,255,255,0.7)',
      accent: '#ffffff',
    },
    light: {
      bg: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%)',
      halo: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 16%, rgba(255,255,255,0) 42%), radial-gradient(circle at 68% 66%, rgba(255,206,160,0.25) 0%, rgba(255,206,160,0) 55%)',
      vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.15) 100%)',
      heading: 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)',
      secondary: 'rgba(51,65,85,0.75)',
      accent: '#1f2937',
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const current = document.documentElement.dataset.theme;
          setTheme(current || 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  useGSAP(() => {
    gsap.set("#nama", { overflow: "hidden" });

    gsap.set([".hero-subtitle", ".hero-description", ".scroll-text", ".scroll-arrow", ".github-container"], {
      opacity: 1,
      y: 0
    });

    let mm = gsap.matchMedia();

    const createTypewriterLoop = (chars, speed) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

      gsap.set(chars, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        transformOrigin: "50% 50%",
      });

      tl.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "expo.out",
        stagger: {
          each: speed,
          from: "start"
        }
      })
        .to({}, { duration: 2.5 })

        .to(chars, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.5,
          ease: "expo.in",
          stagger: {
            each: speed * 0.6,
            from: "end"
          },
        });

      return tl;
    };

    mm.add("(min-width: 768px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      })
        .to(".hero-description", {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        }, "-=1")
        .to(".github-container", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }, "-=0.8")
        .add(() => {
          const chars = gsap.utils.toArray("#nama .char");
          createTypewriterLoop(chars, 0.09);
        }, "-=0.5")
        .to(".scroll-text", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.3")
        .to(".scroll-arrow", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        }, "-=0.5");
    });

    mm.add("(max-width: 767px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 1 })
        .add(() => {
          const chars = gsap.utils.toArray("#nama .char");
          createTypewriterLoop(chars, 0.07);
        }, "-=0.4")
        .to(".hero-description", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(".github-container", { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4")
        .to(".scroll-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".scroll-arrow", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });

    gsap.to(".scroll-arrow", {
      y: -15,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });

  }, []);

  const renderNameWithSpans = () => {
    const name = "Rayyan Ammar Fadhillah";
    return name.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <header
      ref={sectionRef}
      id="home"
      role="banner"
      style={{
        color: themeStyles[theme].accent
      }}
      className={`font-sans flex flex-col items-center justify-center relative min-h-screen overflow-hidden pt-20 theme-${theme}`}
    >
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        <div className="absolute inset-0" style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #040507 0%, #0a0d12 50%, #050608 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%)'
        }} />

        <div
          className="aurora-blob absolute rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            width: '45vw',
            height: '45vw',
            maxWidth: '600px',
            maxHeight: '600px',
            top: '-10%',
            left: '-5%',
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)',
            animation: 'aurora-drift-1 18s ease-in-out infinite',
          }}
        />

        <div
          className="aurora-blob absolute rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            width: '40vw',
            height: '40vw',
            maxWidth: '550px',
            maxHeight: '550px',
            top: '20%',
            right: '-8%',
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(34,211,238,0.06) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, rgba(34,211,238,0.05) 50%, transparent 70%)',
            animation: 'aurora-drift-2 22s ease-in-out infinite',
          }}
        />

        <div
          className="aurora-blob absolute rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            width: '50vw',
            height: '35vw',
            maxWidth: '700px',
            maxHeight: '500px',
            bottom: '-5%',
            left: '25%',
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(251,146,60,0.10) 0%, rgba(245,158,11,0.05) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, rgba(245,158,11,0.04) 50%, transparent 70%)',
            animation: 'aurora-drift-3 25s ease-in-out infinite',
          }}
        />

        <div
          className="aurora-blob absolute rounded-full blur-[80px] sm:blur-[120px]"
          style={{
            width: '25vw',
            height: '25vw',
            maxWidth: '350px',
            maxHeight: '350px',
            top: '5%',
            right: '15%',
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, rgba(219,39,119,0.04) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, rgba(219,39,119,0.03) 50%, transparent 70%)',
            animation: 'aurora-drift-4 20s ease-in-out infinite',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      <Hero3DBackground theme={theme} />

      <button
        onClick={toggleMusic}
        className="hidden md:block fixed top-6 right-6 z-50 group"
        aria-label="Toggle music"
      >
        <div className="relative">
          
          <div className="absolute -inset-3 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0c1118]/95 to-[#0c0f14]/95 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 shadow-lg">
            
            <div className={`absolute inset-0 rounded-full border-2 ${isPlaying ? 'border-white/30 animate-ping' : 'border-white/15'
              }`} style={{ animationDuration: '2s' }} />

            {isPlaying && (
              <div className="absolute inset-0 rounded-full border border-white/15 animate-spin" style={{ animationDuration: '10s' }} />
            )}

            {isPlaying ? (
              <div className="relative z-10 flex items-center justify-center gap-1">
                <div className="w-1 h-5 bg-white/80 rounded-full shadow-lg shadow-white/30 animate-pulse" style={{ animationDuration: '1.2s' }} />
                <div className="w-1 h-5 bg-white/80 rounded-full shadow-lg shadow-white/30 animate-pulse" style={{ animationDuration: '1.2s', animationDelay: '0.15s' }} />
              </div>
            ) : (
              <div className="relative z-10 ml-0.5">
                <svg className="w-5 h-5 text-white/80 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                
                <div className="absolute inset-0 blur-md">
                  <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {isPlaying && (
              <div className="absolute inset-0 rounded-full bg-white/8 animate-pulse" />
            )}
          </div>

          <div className="absolute top-full right-0 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-0 translate-y-2">
            <div className="relative">
              
              <div className="absolute -top-2 right-6 w-4 h-4 bg-white/95 backdrop-blur-sm border-l border-t border-amber-200/30 transform rotate-45" />

              <div className="relative bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-xl rounded-xl border border-white/40 shadow-2xl w-64 overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-white/20 opacity-50" />

                <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
                  <img
                    src="/img/gemilang.jpg"
                    alt="Album Cover"
                    className="w-full h-full object-cover object-center"
                    width="256" height="160"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  <div className="hidden w-full h-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 items-center justify-center">
                    <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-amber-300/40">
                    <p className="text-[10px] text-gray-800 font-semibold flex items-center gap-1.5">
                      {isPlaying ? (
                        <>
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                          Now Playing
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          Paused
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="relative p-4 space-y-2">
                  
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">
                      Gemilang
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Perunggu
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <span>Talk That Talk</span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-amber-600 font-medium">
                    <span>Click to {isPlaying ? 'pause' : 'play'}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl opacity-50">
                  <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-amber-300/30 via-white/30 to-amber-300/30 bg-clip-border animate-pulse" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      <audio ref={audioRef} loop preload="none">
        <source src="/music/Perunggu - Gemilang (Official Lyric Video).mp3" type="audio/mp3" />
      </audio>

      <div ref={containerRef} className="relative z-20 w-full max-w-6xl mx-auto px-6 mt-10"> 
        
        <div className="text-center">
          <h1
            className="text-2xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-bold leading-tight mb-6 tracking-tight px-4 font-heading"
            id="nama"
            style={{
              color: themeStyles[theme].accent,
              textShadow: theme === 'dark' ? '0 0 30px rgba(255,255,255,0.3)' : '0 0 18px rgba(15,23,42,0.12)'
            }}
          >
            {renderNameWithSpans()}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl hero-subtitle font-semibold tracking-[0.08em] uppercase mb-4" aria-label="Hi, I'm">
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: themeStyles[theme].heading,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Hi, I'm
            </span>
          </p>
          
          <div className="relative mt-6">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-semibold tracking-[0.12em] uppercase">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: themeStyles[theme].heading,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Full Stack Developer - DevOps Engineer - UI/UX & Graphic Designer - Artist
              </span>
            </h2>
          </div>

          <div className="relative mt-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium tracking-[0.08em]">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: themeStyles[theme].heading,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Photography Enthusiast
              </span>
            </p>
          </div>

          <p
            className="hero-description text-base sm:text-lg mt-6 max-w-2xl mx-auto italic"
            style={{ color: themeStyles[theme].secondary }}
          >
            “If you cannot stand the fatigue of learning, then you must stand the pain of ignorance.”
          </p>
        </div>

        <div className="github-container flex items-center justify-center relative z-25 mt-8 lg:mt-12">
          <a
            href="https://github.com/rayyanbabab"
            className="group relative"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isHovered ? 'bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl' : 'bg-white/20 blur-lg'
                }`} />

              <div className="relative w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center 
                            border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 
                            group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
                
                <svg
                  role="img"
                  aria-label="GitHub"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 transition-all duration-300 transform-gpu group-hover:scale-110 fill-white group-hover:fill-cyan-400"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.47-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.103.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
                
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${isHovered
                    ? 'border-cyan-400/50 animate-ping-slow'
                    : 'border-transparent'
                  }`} />
              </div>
            </div>

            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg border border-white/10 whitespace-nowrap">
                Visit my GitHub
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-l border-t border-white/10" />
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-8 lg:mt-12 flex flex-col items-center gap-4 lg:gap-6 relative z-20">
        <h1
          className="scroll-text text-lg sm:text-xl lg:text-2xl font-light tracking-wide"
          style={{ color: themeStyles[theme].accent }}
        >
          Explore My Work
        </h1>
        <div className="scroll-arrow group cursor-pointer">
          <div className={`w-7 h-12 border-2 rounded-full flex justify-center pt-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20 ${theme === 'light'
              ? 'border-slate-300/80 bg-white/50 group-hover:border-cyan-300/70'
              : 'border-white/30 bg-white/5 group-hover:border-cyan-400/60'
            }`}>
            <div className={`w-1.5 h-3 rounded-full animate-bounce ${theme === 'light'
                ? 'bg-gradient-to-b from-cyan-300 to-cyan-500'
                : 'bg-gradient-to-b from-white to-cyan-200'
              }`} />
          </div>
          <div className={`absolute -inset-4 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light' ? 'bg-cyan-400/15' : 'bg-cyan-500/10'
            }`} />
        </div>
      </div>

      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5vw, 3vh) scale(1.05); }
          50% { transform: translate(2vw, 6vh) scale(0.95); }
          75% { transform: translate(-3vw, 2vh) scale(1.08); }
        }

        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-4vw, 5vh) scale(1.06); }
          50% { transform: translate(-7vw, -2vh) scale(0.97); }
          75% { transform: translate(3vw, 4vh) scale(1.03); }
        }

        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(6vw, -4vh) scale(1.04); }
          66% { transform: translate(-4vw, -6vh) scale(0.96); }
        }

        @keyframes aurora-drift-4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-5vw, 5vh) scale(1.1) rotate(10deg); }
        }

        .aurora-blob {
          will-change: transform;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(100px) rotate(180deg); 
            opacity: 0; 
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        .typing-cursor {
          animation: blink 0.8s infinite;
        }

        @keyframes pulse-fast {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes text-glitch-1 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(-2px, 1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        @keyframes text-glitch-2 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(2px, -1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        .char {
          display: inline-block;
          position: relative;
        }

        .char::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #00fff9, #ff00de);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .char:hover::before {
          opacity: 0.3;
        }
      `}</style>

      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '120px',
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, transparent 0%, rgba(4,5,7,0.5) 40%, rgba(10,13,18,0.9) 80%, #0a0d12 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(248,250,252,0.5) 40%, rgba(238,242,255,0.9) 80%, #eef2ff 100%)',
        }}
      />
    </header>
  );
};

export default Hero;