const mocks = vi.hoisted(() => ({
  fromStore: vi.fn(),
  modeStore: {},
  state: { current: false },
  toggle: vi.fn()
}))

vi.mock('@/common/ui/services', () => ({
  modeService: vi.fn(() => ({
    modeStore: mocks.modeStore,
    toggle: mocks.toggle
  }))
}))

vi.mock('svelte/store', () => ({
  fromStore: mocks.fromStore
}))

import { useDarkTheme } from '@/common/ui/components/toggler/toggler.svelte.ts'

describe('useDarkTheme', () => {
  beforeEach(() => {
    mocks.state.current = false
    mocks.fromStore.mockReturnValue(mocks.state)
    mocks.toggle.mockReset()
  })

  it('returns the reactive dark-mode value', () => {
    const theme = useDarkTheme()

    expect(theme.dark).toBe(false)

    mocks.state.current = true

    expect(theme.dark).toBe(true)
  })

  it('exposes the mode toggle action', () => {
    const theme = useDarkTheme()

    theme.toggle()

    expect(mocks.toggle).toHaveBeenCalledTimes(1)
    expect(mocks.fromStore).toHaveBeenCalledWith(mocks.modeStore)
  })
})
