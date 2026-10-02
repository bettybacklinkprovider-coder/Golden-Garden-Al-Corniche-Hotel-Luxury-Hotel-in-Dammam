import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
  t: (keyEn: string, keyAr?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isArabic = language === 'ar';

  const t = (keyEn: string, keyAr?: string) => {
    if (isArabic && keyAr) {
      return keyAr;
    }
    return keyEn;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isArabic, t }}>
      <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-arabic' : 'font-sans-body'}>
        {children}
      </div>
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
