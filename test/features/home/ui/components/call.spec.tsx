import { render, screen } from '@solidjs/testing-library'

import { Call } from '@/home/ui/components/call.svelte'

describe('call', () => {
  const mocks = vi.hoisted(() => ({
    exec: vi.fn()
  }))

  vi.mock('~/di', () => ({
    inject: {
      resolve: vi.fn(() => ({
        exec: mocks.exec
      }))
    }
  }))

  const errBinance = {
    askPrice: '',
    askQty: '',
    bidPrice: '',
    bidQty: '',
    closeTime: 0,
    count: 0,
    firstId: 0,
    highPrice: '',
    lastId: 0,
    lastPrice: '',
    lastQty: '',
    lowPrice: '',
    openPrice: '',
    openTime: 0,
    prevClosePrice: '',
    priceChange: '',
    priceChangePercent: '',
    quoteVolume: '',
    symbol: 'ERR',
    volume: '',
    weightedAvgPrice: ''
  }

  it('should display loading', () => {
    expect.assertions(2)

    mocks.exec.mockResolvedValue({})

    render(() => (
      <Call>
        <p>callback</p>
      </Call>
    ))

    for (const el of screen.getAllByText(/loading/)) {
      expect(el).toBeInTheDocument()
    }
  })

  it('should display callback', async () => {
    expect.assertions(1)

    mocks.exec.mockResolvedValue(errBinance)

    render(() => (
      <Call>
        <p>callback</p>
      </Call>
    ))

    await expect(screen.findByText(/callback/)).resolves.toBeInTheDocument()
  })
})
