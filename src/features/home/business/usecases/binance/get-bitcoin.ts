import { inject, injectable } from 'inversify'

import type { Binance, UseCase } from '@/home/business/models'
import {
  type BinanceRepository,
  binanceRepositoryId
} from '@/home/business/repositories'

@injectable()
export class GetBitcoinUseCase implements UseCase<Binance> {
  constructor(
    @inject(binanceRepositoryId)
    public readonly binanceRepository: BinanceRepository
  ) {}

  readonly exec = () => this.binanceRepository.getBitcoin()
}
