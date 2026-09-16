import { map } from 'nanostores'

export type Accent = 'purple' | 'magenta' | 'teal'

const dataStore = map<{ text: string; color: Accent }>({
  text: '',
  color: 'purple'
})

export const dataService = () => ({
  setAccent: (accent: Accent) => dataStore.setKey('color', accent),
  setText: (text: string) => dataStore.setKey('text', text),
  dataStore
})
