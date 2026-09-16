import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { dataService } from '@/common/ui/services'

export const script = () => {
  if (typeof customElements === 'undefined') return

  if (!customElements.get('home-intro')) {
    @customElement('home-intro')
    class HomeIntro extends LitElement {
      override createRenderRoot() {
        return this
      }

      override render() {
        const storedValue = dataService().dataStore.get().text

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
