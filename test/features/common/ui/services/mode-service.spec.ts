import { modeService } from '@/common/ui/services'

describe('modeService', () => {
  beforeEach(() => {
    localStorage.clear()
    modeService().setDark(false)
  })

  it('persists the dark-mode state', () => {
    const service = modeService()

    service.setDark(true)

    expect(service.modeStore.get()).toBe(true)
    expect(localStorage.getItem('dark')).toBe('true')
  })

  it('toggles the dark-mode state', () => {
    const service = modeService()

    service.toggle()
    expect(service.modeStore.get()).toBe(true)

    service.toggle()
    expect(service.modeStore.get()).toBe(false)
  })
})
