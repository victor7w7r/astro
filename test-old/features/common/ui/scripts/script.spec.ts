import { scriptFunction } from '@/common/ui/scripts'

describe('commonScript', () => {
  const mocks = vi.hoisted(() => ({
    mochThemeStore: {
      get: vi.fn(),
      set: vi.fn(),
      subscribe: vi.fn()
    }
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({ themeStore: mocks.mochThemeStore }))
    }
  }))

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="card-container"></div>
      <div id="card-container"></div>
    `
  })

  it('should apply initial class from themeStore', () => {
    expect.assertions(2)

    mocks.mochThemeStore.get.mockReturnValue({ control: 'initial-control' })

    scriptFunction()

    const elements = document.querySelectorAll('#card-container')
    for (const el of elements) {
      expect(el.className).toBe('card-container initial-control')
    }
  })

  it('should subscribe to themeStore and update className on changes', () => {
    expect.assertions(4)

    const initialControl = 'initial-control'
    const updatedControl = 'updated-control'
    mocks.mochThemeStore.get.mockReturnValue({ control: initialControl })

    scriptFunction()

    const elements = document.querySelectorAll('#card-container')
    for (const el of elements) {
      expect(el.className).toBe(`card-container ${initialControl}`)
    }

    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    const subscriber = mocks.mochThemeStore.subscribe.mock.calls[0][0]
    subscriber({ control: updatedControl })

    for (const el of elements) {
      expect(el.className).toBe(`card-container ${initialControl}`)
    }
  })
})
