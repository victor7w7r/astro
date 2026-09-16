import { script } from '@/common/ui/components/header/header'

describe('header', () => {
  const mocks = vi.hoisted(() => ({
    mockThemeStore: {
      get: vi.fn(() => ({ control: 'initial-control' })),
      subscribe: vi.fn()
    }
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({ themeStore: mocks.mockThemeStore }))
    }
  }))

  beforeEach(() => {
    document.body.innerHTML = `
    <nav class="navbar" id="navbar"></nav>
    `
  })

  it('should set the initial className of the nav element', () => {
    expect.assertions(1)

    script()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nav = document.querySelector('nav')!

    expect(nav.className).toBe('navbar initial-control')
  })

  it('should update the className of the nav element on theme change', () => {
    expect.assertions(1)

    mocks.mockThemeStore.subscribe.mockImplementation(callback => {
      callback({ control: 'updated-control' })
    })

    script()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const nav = document.querySelector('nav')!

    expect(nav.className).toBe('navbar updated-control')
  })
})
