import { scriptFunction } from '@/common/ui/layouts/layout'

describe('layout', () => {
  const mocks = vi.hoisted(() => ({
    mockThemeStore: {
      get: vi.fn(() => ({ dark: 'dark:bg-black', white: 'bg-white' })),
      set: vi.fn(),
      subscribe: vi.fn()
    }
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({ themeStore: mocks.mockThemeStore }))
    }
  }))

  beforeEach(() => {
    document.body.innerHTML = '<main></main>'
  })

  it('should apply initial class from themeStore', () => {
    expect.assertions(1)

    mocks.mockThemeStore.get.mockReturnValue({
      dark: 'dark:bg-black',
      white: 'bg-white'
    })

    scriptFunction()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const main = document.querySelector('main')!
    expect(main.className).toBe(
      'app min-h-screen transition-colors duration-1000 bg-white dark:bg-black'
    )
  })

  it('should subscribe to themeStore and update className on changes', () => {
    expect.assertions(2)

    const initialTheme = { dark: 'dark:bg-black', white: 'bg-white' }
    const updatedTheme = { dark: 'dark:bg-gray-800', white: 'bg-gray-200' }
    mocks.mockThemeStore.get.mockReturnValue(initialTheme)

    scriptFunction()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const main = document.querySelector('main')!
    expect(main.className).toBe(
      'app min-h-screen transition-colors duration-1000 bg-white dark:bg-black'
    )

    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    const subscriber = mocks.mockThemeStore.subscribe.mock.calls[0][0]
    subscriber(updatedTheme)

    expect(main.className).toBe(
      'app min-h-screen transition-colors duration-1000 bg-white dark:bg-black'
    )
  })
})
