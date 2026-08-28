/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navlinks } from '../../constant'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });
  
  const isLight = themeMode === 'light';

  const getNavText = (id, fallback) => {
    switch (id) {
      case 1: return t.nav.home;
      case 2: return t.nav.about;
      case 3: return t.nav.experiences;
      case 4: return t.nav.educations;
      case 5: return t.nav.gallery;
      case 6: return t.nav.projects;
      case 7: return t.nav.github;
      case 8: return t.nav.achievements;
      case 9: return t.nav.contact;
      default: return fallback;
    }
  };

  useEffect(() => {
    const updateTheme = () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        setThemeMode(current);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  const toggleThemeMode = useCallback(() => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(newTheme)
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem('theme', newTheme)
  }, [themeMode])

  const DesktopNavbar = () => (
    <nav className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative flex items-center px-2 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 ${
            isLight 
                ? 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/50' 
                : 'bg-black/80 border-white/10 shadow-xl shadow-black/50'
        }`}
      >
        <a href="#home" className="pl-4 pr-4 flex items-center">
            <img 
                src="/img/logo1.png" 
                alt="Logo" 
                className={`h-9 w-auto object-contain transition-all duration-300 hover:scale-110 ${isLight ? 'invert' : ''}`} 
            />
        </a>
        <div className={`w-px h-6 mr-1 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
        <ul className="flex items-center gap-0.5">
            {navlinks.map((link) => (
                <li key={link.id}>
                    <a 
                        href={link.link}
                        className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                            isLight
                                ? 'text-gray-600 hover:text-black hover:bg-gray-200'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/60'
                        }`}
                    >
                        {getNavText(link.id, link.text)}
                    </a>
                </li>
            ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
          <button 
              onClick={toggleLanguage}
              className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all duration-300 active:scale-95 ${
                  isLight 
                      ? 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-200' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
              title={language === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
              aria-label="Toggle language"
          >
              <span className={`transition-opacity ${language === 'id' ? 'opacity-100 font-extrabold' : 'opacity-40'}`}>ID</span>
              <span className="opacity-30">|</span>
              <span className={`transition-opacity ${language === 'en' ? 'opacity-100 font-extrabold' : 'opacity-40'}`}>EN</span>
          </button>

          <button 
              onClick={toggleThemeMode}
              className={`p-2 rounded-full transition-all duration-300 active:scale-95 ${
                  isLight 
                      ? 'bg-gray-100 text-black hover:bg-gray-200' 
                      : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              aria-label="Toggle theme"
          >
              {isLight ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
          </button>
        </div>
      </motion.div>
    </nav>
  )

  const MobileHeader = () => (
    <header 
        className={`md:hidden fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex items-center justify-between transition-all duration-300 ${
            scrolled
                ? (isLight ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200' : 'bg-black/80 backdrop-blur-lg border-b border-white/10')
                : 'bg-transparent'
        }`}
    >
        <a href="#home" className="relative z-[70]">
            <img 
                src="/img/logo1.png" 
                alt="Logo" 
                className={`h-8 w-auto object-contain transition-all duration-300 ${isLight ? 'invert' : ''}`} 
            />
        </a>

        <div className="flex items-center gap-3 relative z-[70]">
            <button 
                onClick={toggleLanguage}
                className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1 transition-all active:scale-90 ${
                    isLight ? 'text-black bg-gray-100 border border-gray-200' : 'text-white bg-white/10 border border-white/10'
                }`}
                aria-label="Toggle language"
            >
                <span className={language === 'id' ? 'opacity-100 font-extrabold' : 'opacity-40'}>ID</span>
                <span className="opacity-30">|</span>
                <span className={language === 'en' ? 'opacity-100 font-extrabold' : 'opacity-40'}>EN</span>
            </button>

            <button 
                onClick={toggleThemeMode}
                className={`p-2 rounded-full transition-all active:scale-90 ${
                    isLight ? 'text-black bg-gray-100' : 'text-white bg-white/10'
                }`}
                aria-label="Toggle theme"
            >
                {isLight ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
            </button>

            <button 
                onClick={toggleSidebar}
                className={`p-2 rounded-full transition-all active:scale-90 ${
                    isLight ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                aria-label="Menu"
            >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
                    <span className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                    <span className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
                </div>
            </button>
        </div>
    </header>
  )

  const MobileMenu = () => (
    <AnimatePresence>
        {isSidebarOpen && (
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed inset-0 z-[55] flex flex-col justify-center items-center px-6 ${
                    isLight 
                        ? 'bg-white/95 backdrop-blur-xl' 
                        : 'bg-black/95 backdrop-blur-xl'
                }`}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full blur-[100px] opacity-10 ${isLight ? 'bg-black' : 'bg-white'}`} />
                    <div className={`absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full blur-[100px] opacity-10 ${isLight ? 'bg-black' : 'bg-white'}`} />
                </div>

                <nav className="relative z-10 w-full max-w-sm">
                    <ul className="flex flex-col gap-3.5 text-center">
                        {navlinks.map((link, i) => (
                            <motion.li 
                                key={link.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 + (i * 0.04), duration: 0.35 }}
                            >
                                <a 
                                    href={link.link} 
                                    onClick={closeSidebar}
                                    className={`block text-2xl font-bold tracking-tight transition-all duration-300 hover:scale-105 ${
                                        isLight 
                                            ? 'text-black hover:text-gray-600' 
                                            : 'text-white hover:text-gray-300'
                                    }`}
                                >
                                    {getNavText(link.id, link.text)}
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Language Switcher in Mobile Menu */}
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={toggleLanguage}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wider flex items-center gap-2 border transition-all active:scale-95 ${
                          isLight ? 'bg-gray-100 text-black border-gray-200' : 'bg-white/10 text-white border-white/10'
                        }`}
                      >
                        <span className={language === 'id' ? 'font-extrabold underline' : 'opacity-40'}>Bahasa Indonesia</span>
                        <span className="opacity-30">/</span>
                        <span className={language === 'en' ? 'font-extrabold underline' : 'opacity-40'}>English</span>
                      </button>
                    </div>
                </nav>
            </motion.div>
        )}
    </AnimatePresence>
  )

  return (
    <>
      <DesktopNavbar />
      <MobileHeader />
      <MobileMenu />
    </>
  )
}

export default Navbar