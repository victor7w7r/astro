import type { ApiResponse } from 'apisauce'
import { injectable, type ServiceIdentifier } from 'inversify'

import type { Binance } from '@/home/business/models'
import { api } from '~/modules/api-module'

export type BinanceDataSource = Readonly<{
  getBitcoin: () => Promise<ApiResponse<Binance>>
}>

export const binanceDataSourceId: ServiceIdentifier<BinanceDataSource> =
  Symbol.for('BinanceDataSourceId')

@injectable()
export class BinanceDataSourceImpl implements BinanceDataSource {
  private readonly route = '/ticker/price?symbol=BTCUSDT'
  readonly getBitcoin = () => api.get<Binance>(this.route)
}
