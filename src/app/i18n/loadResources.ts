export async function loadResources() {
  return {
    es: {
      app: await import("@app/i18n/locales/es.json").then((m) => m.default),
      auth: await import("@features/auth/i18n/es.json").then((m) => m.default),
      profile: await import("@features/profile/i18n/es.json").then(
        (m) => m.default
      ),
      dashboard: await import("@features/dashboard/i18n/es.json").then(
        (m) => m.default
      ),
      teams: await import("@features/teams/i18n/es.json").then(
        (m) => m.default
      ),
      teamSettings: await import("@features/team-settings/i18n/es.json").then(
        (m) => m.default
      ),
      portfolio: await import("@features/portfolio/i18n/es.json").then(
        (m) => m.default
      ),
      market: await import("@features/market/i18n/es.json").then(
        (m) => m.default
      ),
      lessons: await import("@features/lessons/pages/i18n/es.json").then(
        (m) => m.default
      ),
      assets: await import("@features/assets/i18n/es.json").then(
        (m) => m.default
      ),
    },
    en: {
      app: await import("@app/i18n/locales/en.json").then((m) => m.default),
      auth: await import("@features/auth/i18n/en.json").then((m) => m.default),
      profile: await import("@features/profile/i18n/en.json").then(
        (m) => m.default
      ),
      dashboard: await import("@features/dashboard/i18n/en.json").then(
        (m) => m.default
      ),
      teams: await import("@features/teams/i18n/en.json").then(
        (m) => m.default
      ),
      teamSettings: await import("@features/team-settings/i18n/en.json").then(
        (m) => m.default
      ),
      portfolio: await import("@features/portfolio/i18n/en.json").then(
        (m) => m.default
      ),
      market: await import("@features/market/i18n/en.json").then(
        (m) => m.default
      ),
      lessons: await import("@features/lessons/pages/i18n/en.json").then(
        (m) => m.default
      ),
      assets: await import("@features/assets/i18n/en.json").then(
        (m) => m.default
      ),
    },
  };
}
