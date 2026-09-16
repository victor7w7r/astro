import { atom } from 'nanostores'

export const dataStore = atom('')

export const dataService = () => ({ dataStore })
