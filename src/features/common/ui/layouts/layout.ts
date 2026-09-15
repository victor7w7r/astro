import { themeService } from '@/common/ui/services'

export const scriptFunction = () => {
  const { themeStore } = themeService()

  const className = 'app min-h-screen transition-colors duration-1000'
  const main = document.querySelector('main') ?? document.createElement('main')

  main.className = `${className} ${themeStore.get().white} ${themeStore.get().dark}`
  themeStore.subscribe(
    th => (main.className = `${className} ${th.white} ${th.dark}`)
  )
}
