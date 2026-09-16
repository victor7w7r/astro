import { accentStore, themeService } from '@/common/ui/services'

export const scriptFunction = () => {
  const { themeStore } = themeService()

  const className =
    'app flex min-h-screen flex-col transition-colors duration-1000'
  const main = document.querySelector('main') ?? document.createElement('main')

  main.className = `${className} ${themeStore.get().white} ${themeStore.get().dark}`
  themeStore.subscribe(
    th => (main.className = `${className} ${th.white} ${th.dark}`)
  )

  const applyAccent = (accent: string) => {
    document.documentElement.dataset['accent'] = accent
  }

  applyAccent(accentStore.get())
  accentStore.subscribe(applyAccent)
  document.addEventListener('astro:page-load', () =>
    applyAccent(accentStore.get())
  )
}
