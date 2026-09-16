const applyAccent = (accent: string) =>
  (document.documentElement.dataset['accent'] = accent)

export const script = () => {
  const { modeStore } = modeService()
  const { dataStore } = dataService()

  modeStore.subscribe(isDark => {
    if (typeof document !== 'undefined')
      document.documentElement.classList.toggle('dark', isDark)
  })

  applyAccent(dataStore.get().color)

  dataStore.listen((store, _, __) => applyAccent(store.color))

  document.addEventListener('astro:page-load', () =>
    applyAccent(dataStore.get().color)
  )
}
