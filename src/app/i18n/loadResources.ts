// Importaciones estáticas para garantizar disponibilidad Offline
import esApp from "@app/i18n/locales/es.json";
import esAuth from "@features/auth/i18n/es.json";
import esProfile from "@features/profile/i18n/es.json";
import esDashboard from "@features/dashboard/i18n/es.json";
import esTeams from "@features/teams/i18n/es.json";
import esTeamSettings from "@features/team-settings/i18n/es.json";
import esPortfolio from "@features/portfolio/i18n/es.json";
import esMarket from "@features/market/i18n/es.json";
import esLessons from "@features/lessons/pages/i18n/es.json";
import esAssets from "@features/assets/i18n/es.json";

import enApp from "@app/i18n/locales/en.json";
import enAuth from "@features/auth/i18n/en.json";
import enProfile from "@features/profile/i18n/en.json";
import enDashboard from "@features/dashboard/i18n/en.json";
import enTeams from "@features/teams/i18n/en.json";
import enTeamSettings from "@features/team-settings/i18n/en.json";
import enPortfolio from "@features/portfolio/i18n/en.json";
import enMarket from "@features/market/i18n/en.json";
import enLessons from "@features/lessons/pages/i18n/en.json";
import enAssets from "@features/assets/i18n/en.json";

export async function loadResources() {
  return {
    es: {
      app: esApp,
      auth: esAuth,
      profile: esProfile,
      dashboard: esDashboard,
      teams: esTeams,
      teamSettings: esTeamSettings,
      portfolio: esPortfolio,
      market: esMarket,
      lessons: esLessons,
      assets: esAssets,
    },
    en: {
      app: enApp,
      auth: enAuth,
      profile: enProfile,
      dashboard: enDashboard,
      teams: enTeams,
      teamSettings: enTeamSettings,
      portfolio: enPortfolio,
      market: enMarket,
      lessons: enLessons,
      assets: enAssets,
    },
  };
}