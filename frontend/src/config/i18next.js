import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next, Translation } from 'react-i18next'
import ru from '../locales/ru/translation.json'
import en from '../locales/en/translation.json'
import ar from '../locales/ar/translation.json'

const resources = {
  ru,
  en,
  ar
};

i18n
  .use(LanguageDetector)
  .use (initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n;