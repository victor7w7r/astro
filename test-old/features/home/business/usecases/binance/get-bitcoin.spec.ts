import { errorBinance } from '@/home/business/models'
import type { BinanceRepository } from '@/home/business/repositories'
import { getBitcoinUseCase } from '@/home/business/usecases/binance'

describe('getBitcoinUseCase', () => {
  let binanceRepository: ReturnType<typeof mock<BinanceRepository>>

  let useCase: ReturnType<typeof getBitcoinUseCase>

  beforeEach(() => {
    binanceRepository = mock<BinanceRepository>()
    useCase = getBitcoinUseCase({ binanceRepository })
  })

  it('should call the exec method of binanceRepository and return the result', async () => {
    expect.assertions(2)

    const mockValue = errorBinance()

    binanceRepository.getBitcoin.mockResolvedValue(mockValue)

    const result = await useCase.exec()

    expect(binanceRepository.getBitcoin).toHaveBeenCalledTimes(1)
    expect(result).toBe(mockValue)
  })
})
