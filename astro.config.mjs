import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import UnoCSS from '@unocss/astro'
import { defineConfig } from 'astro/config'
import Sonda from 'sonda/astro'
import AutoExport from 'unplugin-auto-export/vite'
import AutoImport from 'unplugin-auto-import/astro'
import TurboConsole from 'unplugin-turbo-console/astro'
import ViteChecker from 'vite-plugin-checker'
import circleDependency from 'vite-plugin-circular-dependency'
import Terminal from 'vite-plugin-terminal'

import { imports, importTypes } from './auto-import'

export default defineConfig({
  integrations: [
    (await import('@playform/compress')).default(),
    AutoImport({
      dts: 'src/generated/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      // oxlint-disable-next-line typescript/no-unsafe-assignment
      imports: [...imports, ...importTypes]
    }),
    UnoCSS(),
    TurboConsole(),
    vue(),
    svelte()
  ],
  prefetch: true,
  vite: {
    build: { sourcemap: true },
    oxc: {
      decorator: {
        emitDecoratorMetadata: true,
        legacy: true
      }
    },
    plugins: [
      Sonda(),
      AutoExport({
        path: [
          'src/features/common/ui/services/*',
          'src/features/home/business/models/*',
          'src/features/home/business/repositories/*',
          'src/features/home/business/usecases/binance/*',
          'src/features/home/data/datasources/*',
          'src/features/home/data/repositories/*'
        ],

        extname: 'ts',
        formatter: filename => `export * from './${filename}'`
      }),
      Terminal(),
      ViteChecker(),
      circleDependency({ outputFilePath: './circleDep' })
    ]
  }
})
