import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'id' || saved === 'en') return saved;
      // Default to Indonesian ('id') or English ('en')
      return 'id';
    }
    return 'id';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('portfolio_lang', language);
    }
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (lang === 'id' || lang === 'en') {
      setLanguageState(lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'id' ? 'en' : 'id'));
  }, []);

  const currentTranslations = translations[language] || translations.id;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: currentTranslations,
        isId: language === 'id',
        isEn: language === 'en',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
