import type { BinanceRepository } from '@/home/business/repositories'
import { GetBitcoinUseCase } from '@/home/business/usecases/binance'

describe('GetBitcoinUseCase', () => {
  it('delegates the request to the Binance repository', async () => {
    const result = { price: '100000', symbol: 'BTCUSDT' }
    const getBitcoin = vi.fn().mockResolvedValue(result)
    const repository: BinanceRepository = { getBitcoin }
    const useCase = new GetBitcoinUseCase(repository)

    await expect(useCase.exec()).resolves.toBe(result)
    expect(getBitcoin).toHaveBeenCalledTimes(1)
  })
})
