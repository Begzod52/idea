import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru/translation.json';
import uz from './locales/uz/translation.json';

const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
const lng = saved || 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources: { ru: { translation: ru }, uz: { translation: uz } },
    lng,
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

export default i18n;
