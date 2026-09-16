/// <reference types="astro/client" />

type ImportMeta = Readonly<{
  env: ImportMetaEnv
}>

type ImportMetaEnv = Readonly<{
  PUBLIC_API_URL: string
}>
