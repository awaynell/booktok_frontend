// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false, componentInspector: false },
  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page' },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiUrl: 'https://openlibrary.org',
    },
  },

  modules: [
    '@nuxt/image',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Jost: true,
        },
      },
    ],
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
  },
});
