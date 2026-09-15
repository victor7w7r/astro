import { themeService } from '@/common/ui/services'

export const scriptFunction = () => {
  const themeStore = themeService().themeStore

  const className = 'card-container'

  for (const el of document.querySelectorAll('#card-container')) {
    el.className = `${className} ${themeStore.get().control}`
    themeStore.subscribe(th => (el.className = `${className} ${th.control}`))
  }
}
