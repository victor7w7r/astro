import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import AstroAutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import Sonda from 'sonda/astro'
import AutoExport from 'unplugin-auto-export/vite'
import AutoImport from 'unplugin-auto-import/astro'
import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite'
import viteRemove from 'unplugin-remove/vite'
import TurboConsole from 'unplugin-turbo-console/astro'
import checker from 'vite-plugin-checker'
import circleDependency from 'vite-plugin-circular-dependency'
import Terminal from 'vite-plugin-terminal'

import { imports, importTypes } from './auto-import'

export default defineConfig({
  integrations: [
    (await import('@playform/compress')).default(),
    TurboConsole(),
    AstroAutoImport(),
    AutoImport({
      dts: 'src/generated/auto-imports.d.ts',
      imports: [
        {
          'axios': [['default', 'axios']]
        },
        ...imports,
        ...importTypes
      ]
    }),
    vue(),
    svelte()
  ],
  prefetch: true,
  vite: {
    build: {
      sourcemap: true
    },
    oxc: {
      decorator: {
        emitDecoratorMetadata: true,
        legacy: true
      }
    },
    plugins: [
      Sonda(),
      AutoExport(),
      Terminal(),
      viteRemove(),
      checker(),
      PreprocessorDirectives(),
      circleDependency({ outputFilePath: './circleDep' })
    ]
  }
})
