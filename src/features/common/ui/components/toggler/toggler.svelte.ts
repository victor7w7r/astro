export const useDarkTheme = () => {
  const { modeStore, toggle } = modeService()

  const themeState = fromStore(modeStore)

  return {
    toggle,
    get dark() {
      return themeState.current
    }
  }
}
