import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

const LANGUAGE_KEY = 'mercurio-rocket-language';

const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_KEY) || 'es';
  }
  return 'es';
};

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

// Persist language choice
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, lng);
    // Update the HTML lang attribute
    document.documentElement.lang = lng;
  }
});

export default i18n;
