import { errorBinance } from '@/home/business/models'

describe('Binance model', () => {
  it('creates the fallback value used when the API is unavailable', () => {
    expect(errorBinance()).toStrictEqual({ price: '', symbol: 'ERR' })
  })
})
