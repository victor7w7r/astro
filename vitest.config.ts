/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    coverage: {
      enabled: true,
      exclude: ['*.{cjs,js,mjs}']
    },
    environment: 'jsdom',
    globals: true,
    include: ['./test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    setupFiles: './test/setup-tests.ts'
  }
})
