import { errorBinance } from '@/home/business/models'
import { BinanceRepositoryImpl } from '@/home/data/repositories'

describe('BinanceRepositoryImpl', () => {
  it('returns the API data when the response contains data', async () => {
    const value = { price: '100000', symbol: 'BTCUSDT' }
    const getBitcoin = vi.fn().mockResolvedValue({ data: value })
    const repository = new BinanceRepositoryImpl({ getBitcoin })

    await expect(repository.getBitcoin()).resolves.toBe(value)
  })

  it('returns the fallback when the response has no data', async () => {
    const getBitcoin = vi.fn().mockResolvedValue({ data: null })
    const repository = new BinanceRepositoryImpl({ getBitcoin })

    await expect(repository.getBitcoin()).resolves.toStrictEqual(errorBinance())
  })

  it('returns the fallback when the datasource rejects', async () => {
    const getBitcoin = vi.fn().mockRejectedValue(new Error('Network error'))
    const repository = new BinanceRepositoryImpl({ getBitcoin })

    await expect(repository.getBitcoin()).resolves.toStrictEqual(errorBinance())
  })
})
