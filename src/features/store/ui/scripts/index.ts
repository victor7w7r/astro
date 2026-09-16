import { dataService } from '@/common/ui/services'

const initializeStore = () => {
  const input = document.querySelector<HTMLInputElement>('#inputable')
  const button = document.querySelector<HTMLButtonElement>('#send-button')
  const feedback = document.querySelector<HTMLElement>('#store-feedback')
  const state = document.querySelector<HTMLElement>('#store-state')

  if (!input || !button || button.dataset['initialized'] === 'true') return

  const { dataStore } = dataService()
  button.dataset['initialized'] = 'true'

  dataStore.subscribe(value => {
    if (!input.isConnected) return

    const message = value || 'Not yet'
    input.value = value

    if (state) state.textContent = `Store State: ${message}`
  })

  button.addEventListener('click', () => {
    const value = input.value.trim()
    dataStore.set(value)

    if (feedback) {
      feedback.textContent = value ? 'Saved.' : 'Store State: Not yet'
    }
  })
}

export const scriptFunction = () => {
  initializeStore()
  document.addEventListener('astro:page-load', initializeStore)
}
