/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projectsData } from "../../constant";
import { useNavigate } from "react-router-dom";
import ProjectModal from "./assets/ProjectModal";
import { useLanguage } from "../context/LanguageContext";
import BorderBeam from "./ui/BorderBeam";
import Magnetic from "./ui/Magnetic";
import ShinyText from "./ui/ShinyText";

const ProjectCard = ({ gambar, judul, parag, tech, linkDemo, linkCode, isComingSoon, isLight, onClick, t }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      rotateX: ((y - centerY) / centerY) * -5,
      rotateY: ((x - centerX) / centerX) * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handle404 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/next-demo');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`,
        transition: "transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isLight
          ? "bg-white/85 border-gray-200/90 hover:border-black/30 hover:shadow-xl backdrop-blur-md"
          : "bg-neutral-900/80 border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-black/50 backdrop-blur-md"
        }`}
    >
      <BorderBeam size={260} duration={8} colorFrom="#38bdf8" colorTo="#818cf8" />
      <div
        className={`absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)'
            }, transparent 60%)`
        }}
      />

      <div className="relative h-48 sm:h-52 overflow-hidden z-10 border-b border-white/5">
        <div className={`absolute inset-0 z-10 transition-colors duration-500 ${isLight ? 'bg-black/5 group-hover:bg-transparent' : 'bg-black/20 group-hover:bg-transparent'
          }`} />
        <img
          src={`/img/${gambar}`}
          alt={judul}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex-1 p-6 flex flex-col z-10">
        <div className="mb-5">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className={`text-lg font-semibold tracking-tight group-hover:translate-x-1 transition-transform duration-300 ${isLight ? "text-gray-900" : "text-white"}`}>
              {judul}
            </h3>
            {isComingSoon && (
              <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase border ${isLight
                  ? 'bg-black/10 text-black border-black/10'
                  : 'bg-white/10 text-white border-white/10'
                }`}>
                {t?.projects?.comingSoon || "Coming Soon"}
              </span>
            )}
          </div>
          <p className={`text-sm line-clamp-3 leading-relaxed font-normal ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            {parag}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {tech?.map((tItem, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-colors duration-300 ${isLight
                  ? "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                }`}
            >
              {tItem}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <a
            href={(!linkDemo || linkDemo === "#") ? "/next-demo" : linkDemo}
            onClick={(!linkDemo || linkDemo === "#") ? handle404 : (e) => e.stopPropagation()}
            target={(!linkDemo || linkDemo === "#") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`group/link flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${isLight ? "text-black hover:text-gray-600" : "text-white hover:text-gray-300"
              }`}
          >
            <span>{t?.projects?.viewDetails || "Preview"}</span>
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
          </a>

          <a
            href={(!linkCode || linkCode === "#") ? "/next-demo" : linkCode}
            onClick={(!linkCode || linkCode === "#") ? handle404 : (e) => e.stopPropagation()}
            target={(!linkCode || linkCode === "#") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${isLight
                ? "text-gray-400 hover:text-black hover:bg-gray-100"
                : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            title={t?.projects?.viewCode || "Source Code"}
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsList = t.projects?.items || projectsData;

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  };

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    scrollStartLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.scrollSnapType = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const delta = dragStartX.current - clientX;
    scrollContainerRef.current.scrollLeft = scrollStartLeft.current + delta;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
      }, 50);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => container.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const handleUp = () => isDragging && handleDragEnd();
    window.addEventListener('mouseup', handleUp);
    return () => window.removeEventListener('mouseup', handleUp);
  }, [isDragging]);

  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden scroll-mt-24 font-sans"
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-20 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading"
            >
              <span className={`bg-clip-text text-transparent ${isLight
                  ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500'
                  : 'bg-gradient-to-r from-white via-gray-200 to-gray-500'
                }`}>
                {t.projects.title}
              </span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className={`h-1 w-24 rounded-full ${isLight ? 'bg-black' : 'bg-white'} mx-auto md:mx-0`}
            />
          </div>

          <div className="hidden md:flex gap-3">
            <Magnetic strength={0.35}>
              <button
                onClick={() => scrollTo('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`p-4 rounded-full border transition-all duration-300 ${isLight
                    ? "border-black/20 text-black hover:bg-black hover:text-white disabled:opacity-30"
                    : "border-white/20 text-white hover:bg-white hover:text-black disabled:opacity-30"
                  }`}
              >
                <ArrowRight className="rotate-180" size={24} />
              </button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                onClick={() => scrollTo('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`p-4 rounded-full border transition-all duration-300 ${isLight
                    ? "border-black/20 text-black hover:bg-black hover:text-white disabled:opacity-30"
                    : "border-white/20 text-white hover:bg-white hover:text-black disabled:opacity-30"
                  }`}
              >
                <ArrowRight size={24} />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-12 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              scrollSnapType: 'x mandatory',
              scrollPaddingLeft: '0px'
            }}
          >
            <div className="flex gap-6 sm:gap-8 w-max">
              {projectsList.map((data, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[420px] flex-shrink-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ProjectCard
                    {...data}
                    isLight={isLight}
                    onClick={() => handleOpenModal(data)}
                    t={t}
                  />
                </motion.div>
              ))}

              <div className="w-4 sm:w-0" />
            </div>
          </div>

          <div className="md:hidden flex justify-center gap-4 mt-4">
            <button onClick={() => scrollTo('left')} disabled={!canScrollLeft} className={`p-3 rounded-full border ${isLight ? 'border-black/20 text-black disabled:opacity-30' : 'border-white/20 text-white disabled:opacity-30'}`}>
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <button onClick={() => scrollTo('right')} disabled={!canScrollRight} className={`p-3 rounded-full border ${isLight ? 'border-black/20 text-black disabled:opacity-30' : 'border-white/20 text-white disabled:opacity-30'}`}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-12 hidden md:block">
          <div className={`relative h-[2px] w-full rounded-full overflow-hidden ${isLight ? 'bg-black/10' : 'bg-white/10'}`}>
            <motion.div
              className={`absolute left-0 top-0 h-full ${isLight ? 'bg-black' : 'bg-white'}`}
              style={{ width: `${scrollProgress}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <div className={`flex justify-between mt-2 text-xs font-mono uppercase tracking-widest opacity-50 ${isLight ? 'text-black' : 'text-white'}`}>
            <span>{String(Math.round((scrollProgress / 100) * (projectsList.length - 1)) + 1).padStart(2, '0')}</span>
            <span>{String(projectsList.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        isLight={isLight}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;