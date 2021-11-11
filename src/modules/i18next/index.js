import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import user_en from "config/user_en.json";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        ...en,
        ...user_en,
      },
    },
  },
});

export default i18next;
