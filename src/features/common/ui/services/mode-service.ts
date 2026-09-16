import { persistentAtom } from '@nanostores/persistent'

const modeStore = persistentAtom<boolean>('dark', false, {
  decode: JSON.parse,
  encode: JSON.stringify
})

export const modeService = () => {
  const setDark = (isDark: boolean) => modeStore.set(isDark)
  const toggle = () => setDark(!modeStore.get())

  return { setDark, toggle, modeStore }
}
