import { dataService } from '@/common/ui/services'

export const scriptFunction = () => {
  const { dataStore } = dataService()

  const send = () => {
    const value =
      document.querySelector<HTMLInputElement>('#inputable')?.value ?? ''
    dataStore.set(value)
  }

  /*document.querySelector('#send-button')?.append(html`
    <button class="standard-button" onclick=${send}>Send</button>
  `)*/
}
