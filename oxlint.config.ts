import { defineConfig } from 'oxlint'
import {
  astro,
  all,
  deMorgan,
  functional,
  importRules,
  math,
  perfectionist,
  promise,
  security,
  simpleImportSort,
  sonar,
  toplevel,
  typescript,
  unicorn,
  svelte,
  vue
} from 'v7w7r-jslib'

export default defineConfig({
  categories: { correctness: 'error' },
  options: {
    typeAware: true
  },
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: [
    '**/node_modules/',
    '**/*.log',
    '**/.DS_Store',
    '.git/',
    '.github/',
    'public/',
    'dist/',
    'server',
    'tmp',
    '.env',
    '.dockerignore',
    '.gitignore',
    'Dockerfile',
    'LICENSE'
  ],
  extends: [
    astro,
    all,
    deMorgan,
    functional,
    importRules,
    math,
    perfectionist,
    promise,
    security,
    simpleImportSort,
    sonar,
    svelte,
    toplevel,
    typescript,
    unicorn,
    vue
  ]
})
