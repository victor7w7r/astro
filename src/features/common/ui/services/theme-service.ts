import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'

import type { Theme } from '~/theme'

export type AccentName = 'purple' | 'magenta' | 'teal'

export const accentStore = atom<AccentName>('purple')

const controlTheme = 'bg-slate-700/30'
const darkStore = persistentAtom<boolean>('dark', false, {
  decode: JSON.parse,
  encode: JSON.stringify
})

const createTheme = (isDark: boolean): Theme => ({
  control: controlTheme,
  dark: 'dark:bg-zinc-900',
  isDark,
  togglePeer: isDark ? 'peer-checked:bg-[#6603fc]' : '',
  white: 'bg-white'
})

const themeStore = atom<Theme>(createTheme(darkStore.get()))

darkStore.subscribe(isDark => {
  themeStore.set({ ...themeStore.get(), ...createTheme(isDark) })

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark)
  }
})

export const themeService = () => {
  const setDark = (isDark: boolean) => darkStore.set(isDark)

  const toggle = () => setDark(!darkStore.get())

  const changeSelector = (selector: string) => {
    const current = themeStore.get()

    themeStore.set(
      current.isDark
        ? {
            ...current,
            control: `bg-${selector}-700/30`,
            dark: `dark:bg-${selector}-900`,
            togglePeer: `peer-checked:bg-${selector}-500`
          }
        : {
            ...current,
            control: `bg-${selector}-700/30`,
            togglePeer: `peer-checked:bg-${selector}-300`,
            white: `bg-${selector}-300`
          }
    )
  }

  const changeBlue = () => changeSelector('sky')
  const changePurple = () => changeSelector('purple')
  const changeRed = () => changeSelector('red')
  const changeEmerald = () => changeSelector('emerald')
  const setAccent = (accent: AccentName) => accentStore.set(accent)

  return {
    changeBlue,
    changeEmerald,
    changePurple,
    changeRed,
    setAccent,
    setDark,
    themeStore,
    toggle
  }
}
