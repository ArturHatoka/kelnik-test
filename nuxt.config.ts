export default defineNuxtConfig({
  compatibilityDate: '2025-08-13',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
  }
})