const mocks = vi.hoisted(() => ({
  dataStore: {
    get: vi.fn(() => ({ color: 'teal', text: '' })),
    listen: vi.fn()
  },
  modeStore: {
    subscribe: vi.fn()
  }
}))

vi.mock('@/common/ui/services', () => ({
  dataService: vi.fn(() => ({ dataStore: mocks.dataStore })),
  modeService: vi.fn(() => ({ modeStore: mocks.modeStore }))
}))

import { script } from '@/common/ui/layouts/layout'

describe('layout script', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    delete document.documentElement.dataset.accent
    mocks.dataStore.get.mockReturnValue({ color: 'teal', text: '' })
    mocks.dataStore.listen.mockReset()
    mocks.modeStore.subscribe.mockReset()
  })

  it('applies the persisted accent and dark mode', () => {
    script()

    expect(document.documentElement.dataset.accent).toBe('teal')
    expect(mocks.dataStore.get).toHaveBeenCalledTimes(1)
    expect(mocks.modeStore.subscribe).toHaveBeenCalledTimes(1)

    const onModeChange = mocks.modeStore.subscribe.mock.calls[0][0]
    onModeChange(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    onModeChange(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('applies accent changes and restores the accent after page load', () => {
    script()

    const onDataChange = mocks.dataStore.listen.mock.calls[0][0]
    onDataChange({ color: 'magenta' }, { color: 'teal', text: '' }, 'color')

    expect(document.documentElement.dataset.accent).toBe('magenta')

    mocks.dataStore.get.mockReturnValue({ color: 'purple', text: '' })
    document.dispatchEvent(new Event('astro:page-load'))

    expect(document.documentElement.dataset.accent).toBe('purple')
  })
})
