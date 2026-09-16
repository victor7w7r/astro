import { GetBitcoinUseCase } from '@/home/business/usecases/binance'
import { container } from '~/modules/di-module'

const getBitcoinUseCase = container.get(GetBitcoinUseCase, { autobind: true })

export const bitcoinPromise = getBitcoinUseCase.exec()

export const formatPrice = (price: string) => {
  const value = Number(price)

  return Number.isFinite(value)
    ? new Intl.NumberFormat('en-US', {
        currency: 'USD',
        maximumFractionDigits: 2,
        style: 'currency'
      }).format(value)
    : 'Unavailable'
}
