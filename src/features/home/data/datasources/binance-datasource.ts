import type { ApiResponse } from 'apisauce'
import { injectable, type ServiceIdentifier } from 'inversify'

import type { Binance } from '@/home/business/models'
import { api, timeout } from '~/modules/api-module'

export type BinanceDataSource = {
  readonly getBitcoin: () => Promise<ApiResponse<Binance[]>>
}

export const binanceDataSourceId: ServiceIdentifier<BinanceDataSource> =
  Symbol.for('BinanceDataSourceId')

@injectable()
export class BinanceDataSourceImpl implements BinanceDataSource {
  private readonly route = '/v3/ticker/24hr'
  readonly getBitcoin = () => api.get<Binance[]>(this.route, { timeout })
}
