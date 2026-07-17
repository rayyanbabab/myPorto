/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experiencesData } from "../../constant";

const ExperienceCard = ({ role, company, type, period, description, skills, isLight }) => {
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
          isLight
            ? "bg-white border-gray-200 hover:border-black shadow-lg hover:shadow-xl"
            : "bg-neutral-900 border-neutral-800 hover:border-white/50 shadow-lg hover:shadow-white/5"
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
              isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)"
            }, transparent 40%)`
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex gap-4 items-start">
            <div className={`p-3 rounded-xl border ${
              isLight
                ? "bg-gray-50 border-gray-200 text-black"
                : "bg-neutral-800 border-neutral-700 text-white"
            }`}>
              <Briefcase size={22} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isLight ? "text-black" : "text-white"}`}>
                {role}
              </h3>
              <p className={`text-sm font-semibold mt-0.5 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                {company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              isLight
                ? "bg-black text-white border-transparent"
                : "bg-white text-black border-transparent"
            }`}>
              {type}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              isLight
                ? "bg-gray-50 border-gray-200 text-gray-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}>
              <Calendar size={12} />
              {period}
            </span>
          </div>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-default ${
                isLight
                  ? "bg-gray-100 text-gray-800 border-gray-200 hover:bg-black hover:text-white hover:border-transparent"
                  : "bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-white hover:text-black hover:border-transparent"
              }`}
            >
              #{skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experiences = () => {
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

  return (
    <section
      id="experiences"
      className="relative py-24 sm:py-32 overflow-hidden font-sans"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? "bg-white" : "bg-black"}`} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${isLight ? "#000" : "#fff"} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? "#000" : "#fff"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isLight ? "bg-gray-200" : "bg-white/10"}`} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading">
            <span className={`bg-clip-text text-transparent ${
              isLight
                ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500"
                : "bg-gradient-to-r from-white via-gray-200 to-gray-500"
            }`}>
              Work Experiences
            </span>
          </h1>
          <div className={`h-1 w-20 mx-auto rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
        </motion.div>

        <div className="space-y-8">
          {experiencesData.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
