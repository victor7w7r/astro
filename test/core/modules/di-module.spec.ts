import { binanceRepositoryId } from '@/home/business/repositories'
import {
  binanceDataSourceId,
  BinanceDataSourceImpl
} from '@/home/data/datasources'
import { BinanceRepositoryImpl } from '@/home/data/repositories'
import { container } from '~/modules/di-module'

describe('dependency container', () => {
  it('resolves the Binance datasource binding', () => {
    expect(container.get(binanceDataSourceId)).toBeInstanceOf(
      BinanceDataSourceImpl
    )
  })

  it('resolves the Binance repository binding', () => {
    expect(container.get(binanceRepositoryId)).toBeInstanceOf(
      BinanceRepositoryImpl
    )
  })
})
