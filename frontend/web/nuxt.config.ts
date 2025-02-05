// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-02-03",
  devtools: { enabled: false },
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
});
