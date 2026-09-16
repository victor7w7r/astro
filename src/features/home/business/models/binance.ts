export type Binance = Readonly<{
  price: string
  symbol: string
}>

export const errorBinance = (): Binance => ({
  price: '',
  symbol: 'ERR'
})
