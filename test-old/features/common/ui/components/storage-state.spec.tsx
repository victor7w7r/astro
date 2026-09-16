import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'

import { StorageState } from '@/common/ui/components/storage-state/storage-state.vue'

describe('storageState', () => {
  const mocks = vi.hoisted(() => ({
    mockData: vi.fn(),
    mockDataStore: {
      get: vi.fn(),
      set: vi.fn(),
      subscribe: vi.fn()
    }
  }))

  vi.mock('@nanostores/solid', () => ({
    useStore: () => mocks.mockData
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({ dataStore: mocks.mockDataStore }))
    }
  }))

  it('should display "Not yet" when data is undefined', () => {
    expect.assertions(1)

    mocks.mockData.mockReturnValue(undefined)

    render(() => <StorageState />)

    expect(screen.getByText('Store State: Not yet.')).toBeInTheDocument()
  })

  it('should display the data value when data is set', () => {
    expect.assertions(2)

    mocks.mockData.mockReturnValue('someData')

    render(() => <StorageState />)

    expect(screen.getByText('Store State: Yes, you write')).toBeInTheDocument()
    expect(screen.getByText('someData')).toBeInTheDocument()
  })
})
