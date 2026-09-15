import { defineConfig, presetMini, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetMini({
      dark: 'class',
      theme: {}
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700']
      }
    })
  ],
  preflights: [
    {
      getCSS() {
        return `
            @font-face {
              font-family: 'Amina Reska';
              src: url('/fonts/amina-reska.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `
      }
    }
  ]
})
