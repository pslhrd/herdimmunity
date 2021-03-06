import { defineNuxtConfig } from 'nuxt'
import glsl from 'vite-plugin-glsl'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/assets/fonts/fonts.scss',
    '@/assets/styles/main.scss',
    '@/assets/styles/reset.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";'
        },
      },
    },
    plugins: [glsl()],
  },

  transpile: [
    'three',
    'gsap',
    'postprocessing'
  ]
})
