// src/app/i18n/loadResources.ts
export async function loadResources() {
  return {
    es: {
      app: await import("@app/i18n/locales/es.json").then((m) => m.default),
      auth: await import("@features/auth/i18n/es.json").then((m) => m.default),
      teamSettings: await import("@features/team-settings/i18n/es.json").then(
        (m) => m.default
      ),
      portfolio: await import("@features/portfolio/i18n/es.json").then((m) => m.default)
    },
    en: {
      app: await import("@app/i18n/locales/en.json").then((m) => m.default),
      auth: await import("@features/auth/i18n/en.json").then((m) => m.default),
      teamSettings: await import("@features/team-settings/i18n/en.json").then(
        (m) => m.default
      ),
      portfolio: await import("@features/portfolio/i18n/en.json").then((m) => m.default)
    },
  };
}
