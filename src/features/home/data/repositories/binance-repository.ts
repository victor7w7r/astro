import { pipe } from 'fp-ts/lib/function'
import { of } from 'fp-ts/lib/Task'
import { getOrElse, map, tryCatch } from 'fp-ts/lib/TaskEither'
import { inject, injectable } from 'inversify'

import { errorBinance } from '@/home/business/models'
import type { BinanceRepository } from '@/home/business/repositories'
import {
  type BinanceDataSource,
  binanceDataSourceId
} from '@/home/data/datasources'

@injectable()
export class BinanceRepositoryImpl implements BinanceRepository {
  constructor(
    @inject(binanceDataSourceId)
    public readonly binanceDataSource: BinanceDataSource
  ) {}

  readonly getBitcoin = async () =>
    pipe(
      tryCatch(this.binanceDataSource.getBitcoin, e => e),
      map(res => res.data ?? errorBinance()),
      getOrElse(() => of(errorBinance()))
    )()
}
