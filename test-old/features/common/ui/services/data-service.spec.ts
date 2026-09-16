import { persistentAtom } from '@nanostores/persistent'

import { dataService } from '@/common/ui/services'

describe('dataService', () => {
  const mocks = vi.hoisted(() => ({
    mockDataStore: {
      get: vi.fn(),
      set: vi.fn(),
      subscribe: vi.fn()
    }
  }))

  vi.mock('@nanostores/persistent', () => ({
    persistentAtom: vi.fn(() => mocks.mockDataStore)
  }))

  it('should initialize dataStore with persistentAtom', () => {
    expect.assertions(2)

    const { dataStore } = dataService()

    expect(persistentAtom).toHaveBeenCalledWith('data', '', {
      decode: JSON.parse,
      encode: JSON.stringify
    })
    expect(dataStore).toBe(mocks.mockDataStore)
  })

  it('should get data from dataStore', () => {
    expect.assertions(2)

    const { dataStore } = dataService()
    mocks.mockDataStore.get.mockReturnValue('someData')

    const data = dataStore.get()

    expect(data).toBe('someData')
    expect(mocks.mockDataStore.get).toHaveBeenCalled()
  })

  it('should set data in dataStore', () => {
    expect.assertions(1)

    const { dataStore } = dataService()

    dataStore.set('newData')

    expect(mocks.mockDataStore.set).toHaveBeenCalledWith('newData')
  })

  it('should subscribe to dataStore', () => {
    expect.assertions(1)

    const { dataStore } = dataService()
    const callback = vi.fn()

    dataStore.subscribe(callback)

    expect(mocks.mockDataStore.subscribe).toHaveBeenCalledWith(callback)
  })
})
