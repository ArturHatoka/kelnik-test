import svgLoader from 'vite-svg-loader'

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
  },
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_utils.scss" as *;\n@use "~/assets/scss/_vars.scss" as *;\n'
        }
      }
    }
  }
})