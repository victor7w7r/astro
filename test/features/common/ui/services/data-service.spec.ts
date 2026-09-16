import { dataService } from '@/common/ui/services'

describe('dataService', () => {
  const service = dataService()

  beforeEach(() => {
    service.dataStore.set({ color: 'purple', text: '' })
  })

  it('returns the shared data store', () => {
    expect(dataService().dataStore).toBe(service.dataStore)
  })

  it('updates the selected accent', () => {
    service.setAccent('teal')

    expect(service.dataStore.get().color).toBe('teal')
  })

  it('updates the stored text', () => {
    service.setText('hello from the store')

    expect(service.dataStore.get().text).toBe('hello from the store')
  })

  it('notifies subscribers when the store changes', () => {
    const listener = vi.fn()
    const unsubscribe = service.dataStore.listen(listener)

    service.setText('new value')

    expect(listener).toHaveBeenCalledWith(
      { color: 'purple', text: 'new value' },
      { color: 'purple', text: '' },
      'text'
    )

    unsubscribe()
  })
})
