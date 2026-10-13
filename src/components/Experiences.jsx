/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, FolderArchive } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import BorderBeam from "./ui/BorderBeam";
import ShinyText from "./ui/ShinyText";
import JourneyArchiveFolder from "./ui/JourneyArchiveFolder";

const archivesData = [
  {
    year: "2025",
    title: "Systems & Internship",
    photos: [
      { src: "/img/tiket.png", title: "Clinic Ticketing System" },
      { src: "/img/absensi.png", title: "QR Code Attendance System" },
      { src: "/img/ukom.jpeg", title: "Uji Kompetensi Keahlian (UKK)" },
    ],
  },
  {
    year: "2024",
    title: "Freelance & Web Products",
    photos: [
      { src: "/img/Ngasir.png", title: "Ngasir POS Application" },
      { src: "/img/RuangGaya.png", title: "RuangGaya E-Commerce" },
      { src: "/img/kegiatan sekolah.png", title: "School Tech Showcase" },
    ],
  },
  {
    year: "2023",
    title: "Foundations & Skills",
    photos: [
      { src: "/img/sopskil.jpeg", title: "Softskill & Leadership" },
      { src: "/img/Al-quran.png", title: "Digital Al-Quran App" },
      { src: "/img/oan_kp.jpg", title: "Technical Field Training" },
    ],
  },
];

const ExperienceItem = ({ exp, index, isLight, isLast }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const archive = archivesData[index] || archivesData[0];
  const isEven = index % 2 === 0;

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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-16 md:mb-24 last:mb-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left or Right on Desktop depending on alternation */}
        <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`group relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${
              isLight
                ? "bg-white/90 border-neutral-300 hover:border-black/50 shadow-md hover:shadow-2xl hover:-translate-y-1 backdrop-blur-md"
                : "bg-neutral-900/80 border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 backdrop-blur-md"
            }`}
          >
            <BorderBeam size={280} duration={8} colorFrom="#06b6d4" colorTo="#8b5cf6" />

            {/* Interactive Spotlight Cursor Glare */}
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
                  className={`p-3 rounded-2xl border transition-colors ${
                    isLight
                      ? "bg-neutral-100 border-neutral-300 text-black group-hover:bg-black group-hover:text-white group-hover:border-black"
                      : "bg-neutral-800 border-neutral-700 text-white group-hover:bg-white group-hover:text-black group-hover:border-white"
                  }`}
                >
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? "text-black" : "text-white"}`}>
                    {exp.role}
                  </h3>
                  <p className={`text-sm font-semibold mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    {exp.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    isLight ? "bg-black text-white border-transparent" : "bg-white text-black border-transparent"
                  }`}
                >
                  {exp.type}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                    isLight ? "bg-neutral-100 border-neutral-300 text-neutral-700" : "bg-neutral-800 border-neutral-700 text-neutral-300"
                  }`}
                >
                  <Calendar size={12} />
                  {exp.period}
                </span>
              </div>
            </div>

            <p className={`relative z-10 text-sm sm:text-base leading-relaxed mb-6 font-normal ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
              {exp.description}
            </p>

            <div className="relative z-10 flex flex-wrap gap-2">
              {exp.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg border transition-all cursor-default ${
                    isLight
                      ? "bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-black hover:text-white hover:border-transparent"
                      : "bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-white hover:text-black hover:border-transparent"
                  }`}
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Opposite Column: Interactive 3D Journey Archive Folder */}
        <div className={`lg:col-span-5 flex justify-center items-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <JourneyArchiveFolder
            year={archive.year}
            title={archive.title}
            photos={archive.photos}
            isLight={isLight}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Experiences = () => {
  const { t, isId } = useLanguage();
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
      className="relative py-20 sm:py-28 overflow-hidden font-sans"
    >
      {/* Background Ambience */}
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
            isLight ? "bg-cyan-300" : "bg-indigo-500/20"
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
              background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
            }}
          >
            <FolderArchive size={14} className="text-cyan-400" />
            <ShinyText
              text={t.experiences?.badge || (isId ? "Karier & Dokumentasi" : "Career & Archives")}
              className={`text-xs font-mono font-semibold tracking-wider uppercase ${isLight ? "text-neutral-600" : "text-neutral-300"}`}
            />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading">
            <span
              className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500"
                  : "bg-gradient-to-r from-white via-neutral-200 to-neutral-500"
              }`}
            >
              {t.experiences?.title || (isId ? "Pengalaman & Jejak Proyek" : "Experience & Journey")}
            </span>
          </h2>
          <p className="text-sm sm:text-base font-mono text-neutral-500 max-w-xl mx-auto mb-4">
            {isId
              ? "Klik folder arsip untuk melihat dokumentasi foto & bukti pencapaian setiap tahun"
              : "Click the archive folders to reveal photographic evidence and project milestones"}
          </p>
          <div className={`h-1 w-20 mx-auto rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
        </motion.div>

        {/* Timeline Milestones with 3D Dossier Folders */}
        <div className="relative">
          {items.map((exp, index) => (
            <ExperienceItem
              key={exp.id || index}
              exp={exp}
              index={index}
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
