const mocks = vi.hoisted(() => ({
  get: vi.fn()
}))

vi.mock('~/modules/api-module', () => ({
  api: { get: mocks.get }
}))

import { BinanceDataSourceImpl } from '@/home/data/datasources'

describe('BinanceDataSourceImpl', () => {
  it('requests the BTCUSDT ticker from the API', async () => {
    const response = {
      data: { price: '100000', symbol: 'BTCUSDT' }
    }
    mocks.get.mockResolvedValueOnce(response)

    const result = await new BinanceDataSourceImpl().getBitcoin()

    expect(mocks.get).toHaveBeenCalledWith('/ticker/price?symbol=BTCUSDT')
    expect(result).toBe(response)
  })
})
