import { themeService } from '@/common/ui/services'

export const scriptFunction = () => {
  const { themeStore } = themeService()
  const nav = document.querySelector('nav') ?? document.createElement('nav')

  nav.className = `navbar ${themeStore.get().control}`
  themeStore.subscribe(th => (nav.className = `navbar ${th.control}`))
}
