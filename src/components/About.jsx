import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import Magnetic from "./ui/Magnetic";
import CardTilt from "./ui/CardTilt";
import ShinyText from "./ui/ShinyText";
import BorderBeam from "./ui/BorderBeam";

const About = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const statsList = [
    { label: t.about.stats.experience, value: t.about.stats.experienceVal },
    { label: t.about.stats.location, value: t.about.stats.locationVal },
    { label: t.about.stats.age, value: t.about.stats.ageVal },
    { label: t.about.stats.status, value: t.about.stats.statusVal },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-24 sm:py-32 px-4 md:px-8 overflow-hidden font-sans"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? "bg-white" : "bg-black"}`} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${isLight ? "#000" : "#fff"} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? "#000" : "#fff"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-15 ${
            isLight ? "bg-indigo-300" : "bg-indigo-500/20"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
              background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <ShinyText text={t.about.title} className={`text-xs font-semibold tracking-wider uppercase ${isLight ? "text-gray-600" : "text-gray-300"}`} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading"
          >
            <span
              className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500"
                  : "bg-gradient-to-r from-white via-gray-200 to-gray-500"
              }`}
            >
              {t.about.title}
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`h-1 w-24 mx-auto rounded-full ${isLight ? "bg-black" : "bg-white"}`}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Card with 3D Tilt & Glow */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 40 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`order-1 ${isMobile ? "order-1" : "lg:order-2"} flex justify-center lg:justify-end`}
          >
            <CardTilt maxTilt={8} glare={true} className="rounded-2xl">
              <div className="relative group">
                {/* Outer ambient glow */}
                <div
                  className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl ${
                    isLight ? "bg-black/5" : "bg-white/10"
                  }`}
                />

                <div
                  className={`absolute -inset-4 border transition-all duration-500 rounded-2xl ${
                    isLight ? "border-black/5 group-hover:border-black/15" : "border-white/5 group-hover:border-white/20"
                  }`}
                />

                <div
                  className={`relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] ${
                    isLight ? "shadow-black/10 border border-black/5" : "shadow-white/5 border border-white/10"
                  }`}
                >
                  <div
                    className={`absolute inset-0 z-10 opacity-15 group-hover:opacity-0 transition-opacity duration-500 ${
                      isLight ? "bg-black" : "bg-black"
                    }`}
                  />

                  <img
                    src="/img/rayy.png"
                    alt="Rayyan Ammar Fadhillah"
                    className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Decorative corner brackets */}
                <div
                  className={`absolute -bottom-5 -left-5 w-20 h-20 border-b-2 border-l-2 rounded-bl-2xl transition-all duration-500 ${
                    isLight ? "border-black group-hover:translate-x-1.5 group-hover:-translate-y-1.5" : "border-white group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                  }`}
                />
                <div
                  className={`absolute -top-5 -right-5 w-20 h-20 border-t-2 border-r-2 rounded-tr-2xl transition-all duration-500 ${
                    isLight ? "border-black group-hover:-translate-x-1.5 group-hover:translate-y-1.5" : "border-white group-hover:-translate-x-1.5 group-hover:translate-y-1.5"
                  }`}
                />
              </div>
            </CardTilt>
          </motion.div>

          {/* Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 40 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className={`order-2 ${isMobile ? "order-2" : "lg:order-1"} space-y-8 text-center lg:text-left`}
          >
            <div>
              <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-heading ${isLight ? "text-black" : "text-white"}`}>
                Rayyan Ammar Fadhillah
              </h3>
              <p className={`text-lg md:text-xl font-medium tracking-wide ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                {t.about.role}
              </p>
            </div>

            <div className={`space-y-4 text-base md:text-lg leading-relaxed ${isLight ? "text-gray-700" : "text-gray-300"}`}>
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>

            {/* Spotlight Stat Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {statsList.map((item, idx) => (
                <StatCard key={idx} item={item} isLight={isLight} />
              ))}
            </div>

            {/* Shimmer Download CV Button with GSAP Magnetic pull */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Magnetic strength={0.35}>
                <a
                  href="/file/cv rayyan resmi.pdf"
                  download
                  className={`group relative inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-bold tracking-wide transition-all duration-300 rounded-full overflow-hidden shadow-lg ${
                    isLight
                      ? "bg-black text-white hover:bg-neutral-800 shadow-black/10 hover:shadow-black/20"
                      : "bg-white text-black hover:bg-neutral-200 shadow-white/10 hover:shadow-white/20"
                  }`}
                >
                  {/* Moving shimmer light reflection */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <span className="relative z-10 flex items-center gap-2.5">
                    {t.about.downloadCv}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </span>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Spotlight Stat Card Component
const StatCard = ({ item, isLight }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 overflow-hidden text-center cursor-default ${
        isLight
          ? "bg-white/80 border-gray-200/90 shadow-sm hover:border-black/30 hover:shadow-md"
          : "bg-neutral-900/70 border-white/10 shadow-md hover:border-white/30 hover:shadow-xl"
      }`}
    >
      <BorderBeam size={130} duration={6} colorFrom="#6366f1" colorTo="#a855f7" />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(180px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)"
          }, transparent 70%)`,
        }}
      />
      <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1 transition-colors ${isLight ? "text-gray-500" : "text-gray-400"}`}>
        {item.label}
      </div>
      <div className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${isLight ? "text-black" : "text-white"}`}>
        {item.value}
      </div>
    </div>
  );
};

export default About;