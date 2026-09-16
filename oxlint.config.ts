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
  sonar,
  toplevel,
  typescript,
  unicorn,
  svelte
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
  globals: {
    Accent: 'readonly',
    LitElement: 'readonly',
    container: 'readonly',
    customElement: 'readonly',
    dataService: 'readonly',
    environment: 'readonly',
    fromStore: 'readonly',
    html: 'readonly',
    modeService: 'readonly',
    mock: 'readonly',
    pipe: 'readonly',
    state: 'readonly',
    $props: 'readonly'
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
    'src/generated/auto-imports.d.ts',
    '.dockerignore',
    '.gitignore',
    'Dockerfile',
    'test-old',
    'LICENSE'
  ],
  rules: {
    'no-unused-vars': 'off'
  },
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
    sonar,
    svelte,
    toplevel,
    typescript,
    unicorn
  ]
})
