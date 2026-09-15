import { mock } from 'vitest-mock-extended'

import { errorBinance } from '@/home/business/models'
import { BinanceDataSource, binanceDataSource } from '@/home/data/datasources'
import { timeout } from '~/modules/di-module.ts'

describe('binanceDataSource', () => {
  let axiosInstance: ReturnType<typeof mock<AxiosInstance>>
  let dataSource: BinanceDataSource

  beforeEach(() => {
    axiosInstance = mock<AxiosInstance>()
    dataSource = binanceDataSource({ axiosModule: { client: axiosInstance } })
  })

  it('getBitcoin returns data from Binance API', async () => {
    expect.assertions(2)

    const responseData = [errorBinance()]

    axiosInstance.get.mockResolvedValueOnce({ data: responseData })

    const response = await dataSource.getBitcoin()

    expect(axiosInstance.get).toHaveBeenCalledWith('/v3/ticker/24hr', {
      timeout
    })
    expect(response.data).toStrictEqual(responseData)
  })
})
