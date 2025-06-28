import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Language = 'en' | 'ar';
type SupportedLanguage = Language;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  changeLanguage: (language: SupportedLanguage) => void; // Added this for compatibility
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations: Record<SupportedLanguage, Record<string, any>> = {
  en,
  ar,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function getNestedValue(
  obj: Record<string, any>,
  path: string,
): string | undefined {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function interpolate(
  str: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return str;
  return str.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => `${params[key.trim()] ?? ''}`,
  );
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('ar');

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const raw = getNestedValue(translations[language], key);
    if (!raw) {
      console.warn(
        `Translation key "${key}" not found for language "${language}"`,
      );
      return key; // Return the key as fallback
    }
    return interpolate(raw, params);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.warn('useLanguage must be used within a LanguageProvider');
    // Return a more complete fallback
    return {
      language: 'ar',
      setLanguage: () => {},
      changeLanguage: () => {},
      t: (key: string) => {
        console.warn(`Translation attempted outside provider: ${key}`);
        return key;
      },
    };
  }
  return context;
};
