import { Binance, errorBinance } from '@/home/business/models/binance'

describe('binance', () => {
  it('errorBinance returns an object with symbol "ERR"', () => {
    expect.assertions(1)

    const error = errorBinance()
    expect(error.symbol).toBe('ERR')
  })

  it('binance type has correct properties', () => {
    expect.assertions(1)

    const binance: Binance = {
      askPrice: '100',
      askQty: '10',
      bidPrice: '90',
      bidQty: '20',
      closeTime: 1622376000000,
      count: 100,
      firstId: 1,
      highPrice: '110',
      lastId: 100,
      lastPrice: '105',
      lastQty: '5',
      lowPrice: '85',
      openPrice: '95',
      openTime: 1622376000000,
      prevClosePrice: '92',
      priceChange: '10',
      priceChangePercent: '10%',
      quoteVolume: '1000',
      symbol: 'BTCUSDT',
      volume: '10000',
      weightedAvgPrice: '100.5'
    }

    expect(binance).toStrictEqual(
      expect.objectContaining({
        askPrice: expect.any(String),
        askQty: expect.any(String),
        bidPrice: expect.any(String),
        bidQty: expect.any(String),
        closeTime: expect.any(Number),
        count: expect.any(Number),
        firstId: expect.any(Number),
        highPrice: expect.any(String),
        lastId: expect.any(Number),
        lastPrice: expect.any(String),
        lastQty: expect.any(String),
        lowPrice: expect.any(String),
        openPrice: expect.any(String),
        openTime: expect.any(Number),
        prevClosePrice: expect.any(String),
        priceChange: expect.any(String),
        priceChangePercent: expect.any(String),
        quoteVolume: expect.any(String),
        symbol: expect.any(String),
        volume: expect.any(String),
        weightedAvgPrice: expect.any(String)
      })
    )
  })
})
