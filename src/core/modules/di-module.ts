import 'reflect-metadata'
import { Container } from 'inversify'

import { binanceRepositoryId } from '@/home/business/repositories'
import {
  binanceDataSourceId,
  BinanceDataSourceImpl
} from '@/home/data/datasources'
import { BinanceRepositoryImpl } from '@/home/data/repositories'

// oxlint-disable-next-line import/exports-last
export const container = new Container()

container.bind(binanceDataSourceId).to(BinanceDataSourceImpl)
container.bind(binanceRepositoryId).to(BinanceRepositoryImpl)
