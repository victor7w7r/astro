const mocks = vi.hoisted(() => {
  const result = { price: '1234.5', symbol: 'BTCUSDT' }
  const exec = vi.fn().mockResolvedValue(result)

  return {
    container: {
      get: vi.fn(() => ({ exec }))
    },
    exec,
    result
  }
})

vi.mock('~/modules/di-module', () => ({
  container: mocks.container
}))

import {
  bitcoinPromise,
  formatPrice
} from '@/home/ui/components/call.svelte.ts'

describe('call helpers', () => {
  it('formats a valid price as USD', () => {
    expect(formatPrice('1234.5')).toBe('$1,234.50')
  })

  it('returns Unavailable for an invalid price', () => {
    expect(formatPrice('not-a-number')).toBe('Unavailable')
  })

  it('loads the Bitcoin value through the dependency container', async () => {
    await expect(bitcoinPromise).resolves.toBe(mocks.result)
  })
})
