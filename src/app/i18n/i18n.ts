import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { loadResources } from "./loadResources";

async function initI18n() {
  const resources = await loadResources();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "es",
    ns: ["app", "auth"],
    defaultNS: "app",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default initI18n;
