import React, { useState, useEffect } from 'react';
import HeroOrbitCards from './ui/HeroOrbitCards';
import portfolioOrbitCards from '../data/portfolioOrbitCards';
import { useLanguage } from '../context/LanguageContext';

export default function CardOrbitSection() {
  const { language } = useLanguage();
  const [themeMode, setThemeMode] = useState('dark');
  const isLight = themeMode === 'light';

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setThemeMode(current);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div id="card-orbit-section" className="relative w-full">
      <HeroOrbitCards
        key={`portfolio-${themeMode}-${language}`}
        cards={portfolioOrbitCards}
        mode="scroll"
        theme={isLight ? 'original' : 'dark'}
      />
    </div>
  );
}
