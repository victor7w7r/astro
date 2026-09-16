import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { dataService } from '@/common/ui/services'

export const script = () => {
  if (typeof customElements === 'undefined') return

  if (!customElements.get('store-form')) {
    @customElement('store-form')
    class StoreForm extends LitElement {
      private readonly service = dataService()
      private readonly dataStore = this.service.dataStore
      private readonly setText = this.service.setText

      @state() private accessor value: string = this.dataStore.get().text
      @state() private accessor draftValue: string = this.value
      @state() private accessor feedback = ''

      private unsubscribe?: () => void

      override createRenderRoot() {
        return this
      }

      override connectedCallback() {
        super.connectedCallback()

        this.unsubscribe = this.dataStore.subscribe(store => {
          this.value = store.text
          this.draftValue = store.text
        })
      }

      override disconnectedCallback() {
        this.unsubscribe?.()
        super.disconnectedCallback()
      }

      private updateValue = (event: Event) => {
        this.draftValue = (event.target as HTMLInputElement).value
      }

      private saveValue = () => {
        const value = this.draftValue.trim()

        this.setText(value)
        this.feedback = value ? 'Saved.' : 'Store State: Not yet'
      }

      override render() {
        return html`
          <div class="mt-10">
            <p
              class="mb-3 text-center text-sm font-semibold text-slate-700 dark:text-white/70"
              aria-live="polite"
            >
              Store State: ${this.value || 'Not yet'}
            </p>

            <input
              class="store-input store-form-input w-full"
              placeholder="Type your message..."
              type="text"
              .value=${this.draftValue}
              @input=${this.updateValue}
            />

            <div class="mt-4 flex flex-col items-center gap-4">
              <button
                class="primary-button mt-4"
                type="button"
                @click=${this.saveValue}
              >
                Save message
              </button>

              <p
                class="text-sm text-slate-500 dark:text-white/50"
                aria-live="polite"
              >
                ${this.feedback}
              </p>
            </div>
          </div>
        `
      }
    }
  }
}
