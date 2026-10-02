import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import ShinyText from "./ui/ShinyText";
import BorderBeam from "./ui/BorderBeam";
import Magnetic from "./ui/Magnetic";

const Gallery = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const images = t.gallery?.items || [
    { src: "/img/ist.png", title: "Interior View", description: "Istiqlal Mosque" },
    { src: "/img/mount.png", title: "Mountain View", description: "Prau Mountain" },
    { src: "/img/bis.png", title: "Sigma Cat", description: "The watcher of the void" },
    { src: "/img/senja.png", title: "Urban Life", description: "The Sunset" },
    { src: "/img/akt.png", title: "Euphoria", description: "Moments of joy" },
    { src: "/img/city.png", title: "Night Vibe", description: "City Light at Jakarta" },
  ];

  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedImage !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedImage]);

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  return (
    <section 
      id="gallery" 
      ref={containerRef} 
      className="relative py-20 sm:py-28 px-4 md:px-8 overflow-hidden font-sans"
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
        <motion.div 
            style={{ y: yParallax }}
            className="text-center mb-12 md:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
              background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <ShinyText isLight={isLight} className="text-xs font-semibold tracking-wider uppercase">
              Photography & Moments
            </ShinyText>
          </div>

          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading"
          >
            <span className={`bg-clip-text text-transparent ${
                isLight 
                    ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500' 
                    : 'bg-gradient-to-r from-white via-gray-200 to-gray-500'
            }`}>
              {t.gallery.title}
            </span>
          </h2>
          <div className={`h-1 w-24 mx-auto rounded-full ${isLight ? 'bg-black' : 'bg-white'}`} />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          <GalleryCard 
            image={images[4]} 
            index={4} 
            onClick={() => setSelectedImage(4)} 
            isLight={isLight} 
            className="col-span-2 row-span-2" 
          />

          <GalleryCard 
            image={images[0]} 
            index={0} 
            onClick={() => setSelectedImage(0)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />

          <GalleryCard 
            image={images[2]} 
            index={2} 
            onClick={() => setSelectedImage(2)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />

          <GalleryCard 
            image={images[3]} 
            index={3} 
            onClick={() => setSelectedImage(3)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />

          <GalleryCard 
            image={images[5]} 
            index={5} 
            onClick={() => setSelectedImage(5)} 
            isLight={isLight} 
            className="col-span-1 row-span-1" 
          />

          <GalleryCard 
            image={images[1]} 
            index={1} 
            onClick={() => setSelectedImage(1)} 
            isLight={isLight} 
            className="col-span-2 row-span-1" 
          />

          <InstagramCard 
            isLight={isLight} 
            className="col-span-2 row-span-1" 
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute top-6 right-6 z-50">
              <Magnetic strength={0.4}>
                <button className="text-white/50 hover:text-white transition-colors p-2" onClick={() => setSelectedImage(null)} aria-label="Close modal">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </Magnetic>
            </div>
            <div className="absolute left-2 md:left-8 z-50">
              <Magnetic strength={0.4}>
                <button className="text-white/50 hover:text-white transition-colors p-4" onClick={handlePrev} aria-label="Previous image">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
              </Magnetic>
            </div>
            <div className="absolute right-2 md:right-8 z-50">
              <Magnetic strength={0.4}>
                <button className="text-white/50 hover:text-white transition-colors p-4" onClick={handleNext} aria-label="Next image">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </Magnetic>
            </div>

            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
               <img 
                  src={images[selectedImage].src} 
                  alt={images[selectedImage].title}
                  className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-sm shadow-2xl" 
               />
               <div className="mt-4 md:mt-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{images[selectedImage].title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm mt-1 uppercase tracking-widest">{images[selectedImage].description}</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const GalleryCard = ({ image, index, onClick, isLight, className = "" }) => {
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
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ rotateX: 0, rotateY: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                transform: isHovered
                    ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                    : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
            }}
            className={`group relative overflow-hidden rounded-2xl border cursor-pointer ${className} ${
                isLight 
                    ? 'bg-white border-gray-200/90 shadow-sm hover:shadow-2xl hover:border-black/30' 
                    : 'bg-neutral-900 border-neutral-800 shadow-lg hover:shadow-2xl hover:shadow-black/70 hover:border-white/30'
            }`}
        >
            <BorderBeam size={220} duration={8} colorFrom="#f59e0b" colorTo="#ef4444" />
            {/* Spotlight reflection */}
            <div 
                className={`hidden md:block absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                        isLight ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'
                    }, transparent 60%)`
                }}
            />

            <div className="w-full h-full overflow-hidden">
                <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-full object-cover object-center md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className={`absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                <h3 className="text-white font-bold text-sm md:text-lg translate-y-0 md:translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                </h3>
                <p className="text-gray-300 text-[10px] md:text-xs uppercase tracking-wider translate-y-0 md:translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {image.description}
                </p>
            </div>
        </motion.div>
    );
};

const InstagramCard = ({ isLight, className = "" }) => {
    return (
        <a
            href="https://www.instagram.com/rayyanmarf_/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col justify-between p-4 md:p-6 rounded-xl border transition-all duration-300 ${className} ${
                isLight 
                    ? 'bg-black text-white border-transparent hover:bg-gray-900' 
                    : 'bg-white text-black border-transparent hover:bg-gray-200'
            }`}
        >
            <div className="relative z-10">
                <h2 className={`text-2xl md:text-4xl font-black tracking-tighter mb-0 opacity-50 group-hover:opacity-100 transition-opacity`}>MORE</h2>
                <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-4xl font-black tracking-tighter">ON</span>
                    <img src="/img/instagram.png" className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12 ${!isLight && 'invert'}`} alt="IG" />
                </div>
            </div>
            
            <div className="relative z-10 flex justify-between items-end mt-2 md:mt-4">
                <span className="text-xs md:text-sm font-mono opacity-70">@rayyanmarf_</span>
                <svg className="w-5 h-5 md:w-6 md:h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </a>
    )
}

export default Gallery;