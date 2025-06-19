import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: Localization.locale.startsWith('ar') ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  changeLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    Localization.locale.startsWith('ar') ? 'ar' : 'en'
  );
  const [isRTL, setIsRTL] = useState(language === 'ar');

  useEffect(() => {
    const rtl = language === 'ar';
    setIsRTL(rtl);
    I18nManager.allowRTL(rtl);
    I18nManager.forceRTL(rtl);
  }, [language]);

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    await i18n.changeLanguage(lang);
  };

  const t = (key: string, options?: any) => {
    return i18n.t(key, options);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      isRTL,
      changeLanguage,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}