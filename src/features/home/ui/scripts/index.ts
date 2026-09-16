import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { dataService, themeService } from '@/common/ui/services'

const initializeColorButtons = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-color]')
  if (buttons.length === 0) return

  const { setAccent } = themeService()
  const selectedAccent = document.documentElement.dataset['accent'] ?? 'purple'

  buttons.forEach(button => {
    button.classList.toggle(
      'color-button-selected',
      button.dataset['color'] === selectedAccent
    )

    if (button.dataset['initialized'] === 'true') return
    button.dataset['initialized'] = 'true'
    button.addEventListener('click', () => {
      const accent = button.dataset['color']
      if (accent !== 'purple' && accent !== 'magenta' && accent !== 'teal') {
        return
      }

      setAccent(accent)
      buttons.forEach(item => {
        item.classList.toggle('color-button-selected', item === button)
      })
    })
  })
}

export const script = () => {
  initializeColorButtons()
  document.addEventListener('astro:page-load', initializeColorButtons)
  if (typeof customElements === 'undefined') return

  if (!customElements.get('home-intro')) {
    @customElement('home-intro')
    class HomeIntro extends LitElement {
      override createRenderRoot() {
        return this
      }

      override render() {
        const storedValue = dataService().dataStore.get()

        return html`
          <section class="relative z-10 w-full max-w-xl">
            <img class="dark:hidden" src="/brand.png" alt="036astro" />
            <img
              class="hidden dark:block"
              src="/brandwhite.png"
              alt="036astro"
            />
            <p
              class="mt-4 max-w-md text-base leading-7 text-slate-700 sm:text-lg dark:text-white/70"
            >
              An astro template with UnoCSS, Svelte and Vue components, with
              essential and useful libraries. Please enjoy.
            </p>
            <p
              class="display-font mt-4 text-lg text-slate-900 dark:text-white"
              style="width: 100%"
            >
              Store State: ${storedValue || 'Not yet'}
            </p>
          </section>
        `
      }
    }
  }
}
