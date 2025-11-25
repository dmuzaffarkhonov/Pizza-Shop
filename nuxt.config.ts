// https://nuxt.com/docs/api/configuration/nuxt-config
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["@/assets/scss/main.scss"],
  vite: {
    plugins: [tsconfigPaths()],
  },

  build: {
    transpile: ["vue-toastification"],
  },
});
