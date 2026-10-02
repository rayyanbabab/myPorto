/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingParticles from "./ui/FloatingParticles";

gsap.registerPlugin(ScrollTrigger);

const techstack = [
  { id: 1, name: "React", category: "Frontend", level: "Intermediate", src: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB" },
  { id: 2, name: "Next.js", category: "Fullstack", level: "Intermediate", src: "https://cdn.simpleicons.org/nextdotjs/000000", color: "#000000" },
  { id: 3, name: "TypeScript", category: "Language", level: "Advanced", src: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6" },
  { id: 4, name: "Tailwind CSS", category: "Frontend", level: "Advanced", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
  { id: 5, name: "Node.js", category: "Backend", level: "Intermediate", src: "https://cdn.simpleicons.org/nodedotjs/339933", color: "#339933" },
  { id: 6, name: "MongoDB", category: "Database", level: "Intermediate", src: "https://cdn.simpleicons.org/mongodb/47A248", color: "#47A248" },
  { id: 7, name: "Git", category: "Tools", level: "Intermediate", src: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
  { id: 8, name: "Docker", category: "DevOps", level: "Intermediate", src: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
  { id: 9, name: "AWS", category: "Cloud", level: "Advanced", src: "https://logo.svgcdn.com/logos/aws.svg", color: "#FF9900" },
  { id: 10, name: "GraphQL", category: "Backend", level: "Intermediate", src: "https://cdn.simpleicons.org/graphql/E10098", color: "#E10098" },
  { id: 11, name: "Redux", category: "Frontend", level: "Intermediate", src: "https://cdn.simpleicons.org/redux/764ABC", color: "#764ABC" },
  { id: 12, name: "Figma", category: "Design", level: "Intermediate", src: "https://cdn.simpleicons.org/figma/F24E1E", color: "#F24E1E" },
  { id: 13, name: "PostgreSQL", category: "Database", level: "Intermediate", src: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
  { id: 14, name: "Python", category: "Language", level: "Intermediate", src: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
  { id: 15, name: "Vue.js", category: "Frontend", level: "Intermediate", src: "https://cdn.simpleicons.org/vuedotjs/4FC08D", color: "#4FC08D" },
  { id: 16, name: "PHP", category: "Language", level: "Intermediate", src: "https://cdn.simpleicons.org/php/777BB4", color: "#777BB4" },
  { id: 17, name: "Laravel", category: "Backend", level: "Intermediate", src: "https://cdn.simpleicons.org/laravel/FF2D20", color: "#FF2D20" },
];

const FALLBACK_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' rx='12' fill='%23222'/><path d='M20 36h24v4H20zm0-8h24v4H20z' fill='%23fff' opacity='0.85'/></svg>";

const getGlowColor = (color, isLight) => {
  if (!color || color === "#000000" || color.toLowerCase() === "#000") {
    return isLight ? "#111827" : "#ffffff";
  }
  return color;
};

const TechStack = () => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState("dark");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const controlsRef = useRef(null);
  const isLight = theme === "light";

  // Split into 2 rows for Marquee
  const row1 = useMemo(() => [
    techstack[0], // React
    techstack[1], // Next.js
    techstack[2], // TypeScript
    techstack[3], // Tailwind CSS
    techstack[10], // Redux
    techstack[14], // Vue.js
    techstack[11], // Figma
    techstack[6], // Git
  ], []);

  const row2 = useMemo(() => [
    techstack[4], // Node.js
    techstack[16], // Laravel
    techstack[15], // PHP
    techstack[13], // Python
    techstack[12], // PostgreSQL
    techstack[5], // MongoDB
    techstack[7], // Docker
    techstack[8], // AWS
    techstack[9], // GraphQL
  ], []);

  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(techstack.map((t) => t.category)));
    return ["All", ...cats];
  }, []);

  const filteredTech = useMemo(() => {
    return techstack.filter((tech) => {
      const matchesCategory = selectedCategory === "All" || tech.category === selectedCategory;
      const matchesSearch = tech.name.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedQuery]);

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // GSAP scroll reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header badge + title slide up
      gsap.fromTo(
        headerRef.current?.children,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Marquee strip slide in from left
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Search + categories stagger
      if (controlsRef.current) {
        gsap.fromTo(
          controlsRef.current.querySelectorAll(".anim-control"),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: controlsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const gradientColorBg = isLight ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";

  return (
    <section
      id="tech-stack"
      className="relative px-4 sm:px-6 py-20 sm:py-28 overflow-hidden font-sans"
      ref={containerRef}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? "bg-white" : "bg-black"}`} />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${isLight ? "#000" : "#fff"} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? "#000" : "#fff"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20 ${
            isLight ? "bg-blue-300" : "bg-cyan-500/20"
          }`}
        />
        {/* Animated rotating orb */}
        <div
          className="animate-slow-spin absolute top-1/2 right-10 w-72 h-72 rounded-full opacity-5 pointer-events-none"
          style={{ background: isLight ? "radial-gradient(circle, #6366f1, transparent)" : "radial-gradient(circle, #22d3ee, transparent)" }}
        />
        <FloatingParticles count={18} isLight={isLight} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - animated by GSAP ScrollTrigger */}
        <div ref={headerRef} className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
              background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className={`text-xs font-semibold tracking-wider uppercase ${isLight ? "text-gray-600" : "text-gray-300"}`}>
              {t.techStack.badge}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading">
            <span
              className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500"
                  : "bg-gradient-to-r from-white via-gray-200 to-gray-500"
              }`}
            >
              {t.techStack.title}
            </span>
          </h2>

          <div className={`h-1 w-24 mx-auto rounded-full animate-wave ${isLight ? "bg-black" : "bg-white"}`} />
        </div>

        {/* Dynamic Infinite Marquee Strip (Aceternity / Magic UI style) */}
        <div ref={marqueeRef} className="relative mb-20 -mx-4 sm:-mx-6 overflow-hidden py-4 select-none">
          {/* Row 1 - Left */}
          <div className="mb-4">
            <Marquee
              speed={36}
              direction="left"
              pauseOnHover={true}
              gradient={true}
              gradientColor={gradientColorBg}
              gradientWidth={80}
            >
              {row1.map((item) => (
                <MarqueePill key={`row1-${item.id}`} tech={item} isLight={isLight} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 - Right */}
          <div>
            <Marquee
              speed={32}
              direction="right"
              pauseOnHover={true}
              gradient={true}
              gradientColor={gradientColorBg}
              gradientWidth={80}
            >
              {row2.map((item) => (
                <MarqueePill key={`row2-${item.id}`} tech={item} isLight={isLight} />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Search + Category controls - animated by GSAP */}
        <div ref={controlsRef}>
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10 z-20 anim-control">
          <div className="relative group">
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                isLight ? "text-gray-400 group-focus-within:text-black" : "text-gray-500 group-focus-within:text-white"
              }`}
            >
              {isSearching ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              )}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.techStack.searchPlaceholder}
              className={`w-full py-3.5 pl-12 pr-12 rounded-full border outline-none backdrop-blur-md transition-all duration-300 text-sm shadow-sm ${
                isLight
                  ? "bg-white/80 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-black/10"
                  : "bg-neutral-900/80 border-white/10 text-white placeholder-gray-500 focus:border-white/50 focus:ring-2 focus:ring-white/10"
              }`}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200 ${
                  isLight ? "text-gray-400 hover:text-black hover:bg-gray-100" : "text-gray-500 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Categories Pills with Framer Motion layoutId spring transition */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 anim-control">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 border backdrop-blur-sm ${
                  isSelected
                    ? isLight
                      ? "text-white border-transparent"
                      : "text-black border-transparent"
                    : isLight
                    ? "bg-white/60 text-gray-600 border-gray-200 hover:border-gray-400 hover:text-black hover:bg-white"
                    : "bg-neutral-900/60 text-gray-400 border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTechCategory"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className={`absolute inset-0 rounded-full shadow-md ${
                      isLight ? "bg-black shadow-black/20" : "bg-white shadow-white/20"
                    }`}
                  />
                )}
                <span className="relative z-10">
                  {t.techStack.categories[category] || category}
                </span>
              </button>
            );
          })}
        </div>

        </div>{/* end controlsRef */}

        {/* Tech Grid */}
        {isSearching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-6 rounded-2xl border animate-pulse ${
                  isLight ? "bg-white border-gray-200" : "bg-neutral-900/50 border-white/5"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl mb-4 ${isLight ? "bg-gray-100" : "bg-white/10"}`}></div>
                <div className={`h-4 w-20 rounded mb-2 ${isLight ? "bg-gray-100" : "bg-white/10"}`}></div>
                <div className={`h-3 w-14 rounded-full ${isLight ? "bg-gray-100" : "bg-white/10"}`}></div>
              </div>
            ))}
          </div>
        ) : filteredTech.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 max-w-6xl mx-auto"
          >
            <AnimatePresence>
              {filteredTech.map((tech) => (
                <TechCard key={tech.id} tech={tech} isLight={isLight} t={t} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`p-4 rounded-full mb-4 ${isLight ? "bg-gray-100" : "bg-white/5"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isLight ? "text-gray-400" : "text-gray-500"}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className={`text-base font-semibold mb-1 ${isLight ? "text-black" : "text-white"}`}>{t.techStack.noResults}</h3>
          </div>
        )}
      </div>
    </section>
  );
};

// Sleek Marquee Pill component
const MarqueePill = ({ tech, isLight }) => {
  const glow = getGlowColor(tech.color, isLight);

  return (
    <div
      className={`group mx-2.5 px-4 py-2.5 rounded-2xl border flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md ${
        isLight
          ? "bg-white/80 border-gray-200/80 hover:border-black/30 shadow-sm"
          : "bg-neutral-900/80 border-white/10 hover:border-white/30 shadow-md shadow-black/40"
      }`}
      style={{
        boxShadow: `0 4px 20px -2px rgba(0,0,0,0.05)`,
      }}
    >
      <div className="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <img
          src={tech.src}
          alt={tech.name}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallbackApplied) return;
            img.dataset.fallbackApplied = "true";
            img.src = FALLBACK_PLACEHOLDER;
          }}
        />
      </div>
      <span className={`text-sm font-semibold tracking-tight transition-colors ${isLight ? "text-gray-900" : "text-white"}`}>
        {tech.name}
      </span>
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: glow }}
      />
    </div>
  );
};

// Upgraded 3D Tilt Spotlight TechCard
const TechCard = ({ tech, isLight, t }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const glowColor = getGlowColor(tech.color, isLight);
  const translatedLevel = t?.techStack?.levels?.[tech.level] || tech.level;
  const translatedCategory = t?.techStack?.categories?.[tech.category] || tech.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, y: 20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col items-center p-6 rounded-2xl border transition-colors duration-300 cursor-pointer overflow-hidden ${
        isLight
          ? "bg-white/90 border-gray-200/90 shadow-sm"
          : "bg-neutral-900/80 border-white/10 shadow-lg shadow-black/40"
      }`}
      style={{
        transform: isHovered
          ? `perspective(700px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.04, 1.04, 1.04)`
          : "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: "transform 0.14s ease-out, border-color 0.3s, box-shadow 0.3s",
        borderColor: isHovered ? `${glowColor}60` : undefined,
        boxShadow: isHovered
          ? `0 20px 60px -10px ${glowColor}40, 0 0 0 1px ${glowColor}30`
          : undefined,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Aceternity Spotlight Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}28, transparent 70%)`,
        }}
      />

      {/* Glowing corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: `radial-gradient(circle at top right, ${glowColor}, transparent 70%)` }}
      />

      {/* Tech Icon — floats upward on hover with glow */}
      <div
        className="relative w-14 h-14 mb-4 z-10"
        style={{
          transform: isHovered ? "translateY(-6px) translateZ(30px)" : "translateY(0) translateZ(0)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ backgroundColor: glowColor }}
        />
        <img
          src={tech.src}
          alt={tech.name}
          className="relative w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallbackApplied) return;
            img.dataset.fallbackApplied = "true";
            img.src = FALLBACK_PLACEHOLDER;
          }}
        />
      </div>

      <h3
        className={`text-base font-bold text-center mb-2 z-10 transition-colors duration-300 ${isLight ? "text-black" : "text-white"}`}
        style={{ transform: isHovered ? "translateZ(20px)" : "translateZ(0)", transition: "transform 0.3s ease" }}
      >
        {tech.name}
      </h3>

      <div
        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 z-10 border transition-colors ${
          isLight ? "bg-gray-50 text-gray-700 border-gray-200" : "bg-white/5 text-gray-300 border-white/10"
        }`}
        style={{
          borderColor: isHovered ? `${glowColor}50` : undefined,
          color: isHovered ? glowColor : undefined,
          transition: "border-color 0.3s, color 0.3s",
        }}
      >
        {translatedLevel}
      </div>

      <p className={`text-[11px] font-medium z-10 transition-colors ${isLight ? "text-gray-400 group-hover:text-gray-600" : "text-gray-500 group-hover:text-gray-300"}`}>
        {translatedCategory}
      </p>
    </motion.div>
  );
};

export default TechStack;
