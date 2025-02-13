// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-02-03",
  devtools: { enabled: false },
  modules: ["@nuxtjs/i18n"],
  app: {
    head: {
      link: [
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        {
          rel: "icon",
          href: "/favicon-dark.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
  },
  ssr: false,
  css: ["~/assets/globals.sass"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/mixins"\n',
        },
      },
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US" },
      { code: "es", language: "es-ES" },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },
});