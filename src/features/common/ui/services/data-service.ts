import { map } from 'nanostores'

type Accent = 'magenta' | 'purple' | 'teal'

const dataStore = map<{ color: Accent; text: string }>({
  text: '',
  color: 'purple'
})

const dataService = () => ({
  setAccent: (accent: Accent) => dataStore.setKey('color', accent),
  setText: (text: string) => dataStore.setKey('text', text),
  dataStore
})

export { dataService }
export type { Accent }
