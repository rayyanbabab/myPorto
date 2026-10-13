/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import BorderBeam from "./ui/BorderBeam";
import ShinyText from "./ui/ShinyText";
import FlipCard from "./ui/FlipCard";

const Educations = () => {
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const timelineData = t.educations?.items || [];

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
      id="educations"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden font-sans"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
              background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <ShinyText text="Academic Journey" className={`text-xs font-semibold tracking-wider uppercase ${isLight ? "text-gray-600" : "text-gray-300"}`} />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading">
            <span className={`bg-clip-text text-transparent ${isLight
                ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500'
                : 'bg-gradient-to-r from-white via-gray-200 to-gray-500'
              }`}>
              {t.educations.title}
            </span>
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
        </motion.div>

        <div className="relative">
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 md:translate-x-0 ${isLight ? 'bg-gray-300' : 'bg-neutral-800'}`} />

          <motion.div
            className={`absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 md:translate-x-0 origin-top ${isLight
                ? 'bg-gradient-to-b from-black via-gray-800 to-transparent'
                : 'bg-gradient-to-b from-white via-gray-400 to-transparent'
              }`}
            style={{ scaleY: smoothProgress, height: "100%" }}
          />

          <motion.div
            className={`absolute left-4 md:left-1/2 -translate-x-[calc(50%-0.5px)] md:-translate-x-1/2 w-3 h-3 rotate-45 z-20 pointer-events-none ${isLight ? 'bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
              }`}
            style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          />

          <div className="space-y-16 md:space-y-28 pt-8 pb-20">
            {timelineData.map((item, index) => (
              <TimelineCard
                key={index}
                data={item}
                index={index}
                isLight={isLight}
                isEven={index % 2 === 0}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineCard = ({ data, index, isEven, isLight, isMobile }) => {
  const cardHeight = isMobile ? 320 : 285;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring" }}
      className={`relative flex items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className={`w-4 h-4 rounded-full border-[3px] transition-all duration-300 ${data.current
            ? (isLight ? 'bg-black border-gray-400' : 'bg-white border-gray-500')
            : (isLight ? 'bg-white border-black' : 'bg-black border-white')
          }`}>
          {data.current && (
            <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${isLight ? 'bg-black' : 'bg-white'}`} />
          )}
        </div>
      </div>

      <div className="hidden md:block w-1/2" />

      <div className={`w-full md:w-1/2 pl-12 md:pl-0 flex ${isEven ? "md:pr-12 md:justify-end" : "md:pl-12 md:justify-start"}`}>
        <FlipCard
          width="100%"
          height={cardHeight}
          radius={18}
          background={isLight ? '#ffffff' : '#111215'}
          color={isLight ? '#0f172a' : '#f8fafc'}
          shadowColor="#000000"
          shadowOpacity={isLight ? 0.08 : 0.35}
          tilt={true}
          tiltMax={10}
          glare={true}
          glareOpacity={isLight ? 0.16 : 0.22}
          flipOnClick={true}
          draggable={true}
          className="w-full max-w-[540px]"
          front={
            <div className={`relative h-full w-full p-6 sm:p-7 flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden ${
              isLight
                ? "bg-white border-gray-200 text-slate-900"
                : "bg-neutral-900/95 border-neutral-800 text-white"
            }`}>
              <BorderBeam size={220} duration={8} colorFrom="#38bdf8" colorTo="#818cf8" />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                    isLight ? 'bg-black text-white border-transparent' : 'bg-white text-black border-transparent'
                  }`}>
                    {data.year}
                    {data.current && <span className={`flex h-1.5 w-1.5 rounded-full ${isLight ? 'bg-white' : 'bg-black'} animate-pulse`} />}
                  </div>
                  <span className={`text-[11px] font-mono font-medium tracking-wider uppercase flex items-center gap-1 opacity-70 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span>↻</span> Klik / Geser
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  {data.logo ? (
                    <div className={`w-12 h-12 rounded-xl p-2 shrink-0 flex items-center justify-center border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-neutral-800 border-neutral-700'}`}>
                      <img src={data.logo} alt="logo" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl p-2 shrink-0 flex items-center justify-center border font-heading font-black text-lg ${isLight ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-neutral-800 text-gray-300 border-neutral-700'}`}>
                      🎓
                    </div>
                  )}
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold font-heading leading-tight ${isLight ? 'text-black' : 'text-white'}`}>
                      {data.title}
                    </h3>
                    <p className={`text-[10px] sm:text-xs font-medium uppercase tracking-widest mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      {data.subtitle}
                    </p>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  {data.description}
                </p>
              </div>

              {data.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {data.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                        isLight
                          ? 'bg-gray-100 text-gray-800 border-gray-200'
                          : 'bg-neutral-800 text-gray-300 border-neutral-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          }
          back={
            <div className={`relative h-full w-full p-6 sm:p-7 flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden ${
              isLight
                ? "bg-slate-50 border-gray-300 text-slate-900"
                : "bg-neutral-950 border-neutral-700 text-white"
            }`}>
              <BorderBeam size={220} duration={8} colorFrom="#a855f7" colorTo="#38bdf8" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold tracking-widest uppercase font-mono px-2.5 py-0.5 rounded-full ${isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-500/15 text-cyan-400'}`}>
                    ✦ Sorotan &amp; Pencapaian
                  </span>
                  <span className={`text-[11px] font-mono font-medium tracking-wider uppercase flex items-center gap-1 opacity-70 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span>↻</span> Kembali
                  </span>
                </div>

                <div className="mb-2.5">
                  <h4 className={`text-base sm:text-lg font-bold font-heading leading-tight ${isLight ? 'text-black' : 'text-white'}`}>
                    {data.title}
                  </h4>
                  <p className={`text-[11px] font-medium uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {data.subtitle} · {data.year}
                  </p>
                </div>

                {data.highlights ? (
                  <div className="space-y-1.5 my-2">
                    {data.highlights.map((h, i) => (
                      <div key={i} className={`flex items-start gap-2 text-xs sm:text-[13px] ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <span className="text-cyan-400 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {data.description}
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px]">
                <span className={`font-mono text-[10px] opacity-75 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Periode: {data.year}
                </span>
                {data.current && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Aktif Sekarang
                  </span>
                )}
              </div>
            </div>
          }
        />
      </div>
    </motion.div>
  );
};

export default Educations;

