/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import BorderBeam from "./ui/BorderBeam";
import ShinyText from "./ui/ShinyText";

const ExperienceCard = ({ role, company, type, period, description, skills, isLight, isLast }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Timeline Column with glowing pulse dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 mt-6 ${
            isLight
              ? "bg-black border-white ring-4 ring-gray-200/60"
              : "bg-white border-black ring-4 ring-neutral-800"
          }`}
        >
          <span className={`absolute -inset-1 rounded-full animate-ping opacity-25 ${isLight ? "bg-black" : "bg-white"}`} />
        </div>
        {!isLast && (
          <div
            className={`w-[2px] flex-1 my-2 transition-colors ${
              isLight
                ? "bg-gradient-to-b from-gray-300 via-gray-200 to-transparent"
                : "bg-gradient-to-b from-neutral-700 via-neutral-800 to-transparent"
            }`}
          />
        )}
      </div>

      {/* Experience Content Card */}
      <div className="flex-1 pb-10">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
            isLight
              ? "bg-white/85 border-gray-200/90 hover:border-black/30 shadow-md hover:shadow-xl hover:-translate-y-1 backdrop-blur-md"
              : "bg-neutral-900/80 border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 backdrop-blur-md"
          }`}
        >
          <BorderBeam size={280} duration={8} colorFrom="#ec4899" colorTo="#8b5cf6" />
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)"
              }, transparent 60%)`,
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
            <div className="flex gap-3.5 items-start">
              <div
                className={`p-3 rounded-xl border transition-colors ${
                  isLight
                    ? "bg-gray-50 border-gray-200 text-black group-hover:bg-black group-hover:text-white group-hover:border-black"
                    : "bg-neutral-800 border-neutral-700 text-white group-hover:bg-white group-hover:text-black group-hover:border-white"
                }`}
              >
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className={`text-xl font-bold tracking-tight ${isLight ? "text-black" : "text-white"}`}>
                  {role}
                </h3>
                <p className={`text-sm font-semibold mt-0.5 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                  {company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  isLight ? "bg-black text-white border-transparent" : "bg-white text-black border-transparent"
                }`}
              >
                {type}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                  isLight ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-neutral-800 border-neutral-700 text-gray-300"
                }`}
              >
                <Calendar size={12} />
                {period}
              </span>
            </div>
          </div>

          <p className={`relative z-10 text-sm sm:text-base leading-relaxed mb-6 font-normal ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            {description}
          </p>

          <div className="relative z-10 flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-default ${
                  isLight
                    ? "bg-gray-100 text-gray-800 border-gray-200 hover:bg-black hover:text-white hover:border-transparent"
                    : "bg-neutral-800/80 text-gray-300 border-neutral-700 hover:bg-white hover:text-black hover:border-transparent"
                }`}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experiences = () => {
  const { t } = useLanguage();
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";

  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const items = t.experiences?.items || [];

  return (
    <section
      id="experiences"
      className="relative py-24 sm:py-32 overflow-hidden font-sans"
    >
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
          className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none ${
            isLight ? "bg-purple-300" : "bg-purple-500/20"
          }`}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
              background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <ShinyText text={t.experiences.title} className={`text-xs font-semibold tracking-wider uppercase ${isLight ? "text-gray-600" : "text-gray-300"}`} />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading">
            <span
              className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500"
                  : "bg-gradient-to-r from-white via-gray-200 to-gray-500"
              }`}
            >
              {t.experiences.title}
            </span>
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
        </motion.div>

        <div>
          {items.map((exp, index) => (
            <ExperienceCard
              key={exp.id || index}
              {...exp}
              isLight={isLight}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
