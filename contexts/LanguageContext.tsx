import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type SupportedLanguage = 'en' | 'ar';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
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

  const t = (key: string, params?: Record<string, string | number>): string => {
    const raw = getNestedValue(translations[language], key);
    if (!raw) return key;
    return interpolate(raw, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.warn('useLanguage must be used within a LanguageProvider');
    return {
      language: 'ar',
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
};
