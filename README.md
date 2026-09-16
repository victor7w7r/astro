# 036astro

A clean architecture template for Astro with essential packages and strict TypeScript. Made with ❤️ by

![Alt text](/public/brandwhite.png?raw=true 'Title')

### Change to blank template

```bash
$ git clone https://github.com/victor7w7r/036astro
$ cd 036astro
$ git checkout blank
```

## Extra Packages

- apisauce: Axios + standardized errors + request/response transforms.
- inversify: lightweight inversion of control (IoC) container for TypeScript apps
- fp-ts: Functional programming in TypeScript
- nanostores: A tiny (less than 1kb) state manager using observables and persistent stores
- unocss: The instant on-demand Atomic CSS engine, replacement of tailwindcss
- unplugin-auto-import: Automatically import components, hooks, and utilities

Svelte, Vue and Lit frameworks, includes useful vite plugins for debugging.

### Run and Develop (Consider using bun)

```bash
$ cd 036astro
$ bun install     #Install packages
$ bun run dev     #Run develop
$ bun run build   #Make production build
$ bun run preview #Run production build
```
