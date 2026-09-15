import type { ServiceIdentifier } from 'inversify'

import type { Binance } from '@/home/business/models'

export interface BinanceRepository {
  readonly getBitcoin: () => Promise<Binance>
}

export const binanceRepositoryId: ServiceIdentifier<BinanceRepository> =
  Symbol.for('BinanceRepositoryId')
