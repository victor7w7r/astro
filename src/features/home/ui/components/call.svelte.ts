import { GetBitcoinUseCase } from '@/home/business/usecases/binance'

export const bitcoinPromise = container
  .get(GetBitcoinUseCase, { autobind: true })
  .exec()

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
