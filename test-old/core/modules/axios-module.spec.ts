import { axiosModule } from '~/modules/di-module.ts'

describe('axiosModule', () => {
  it('should return an object', () => {
    expect.assertions(1)

    const module = axiosModule()

    expect(typeof module).toBe('object')
  })

  it('should have a client property', () => {
    expect.assertions(1)

    const module = axiosModule()

    expect('client' in module).toBeTruthy()
  })

  it('client should have default baseURL', () => {
    expect.assertions(1)

    const module = axiosModule()

    expect(module.client.defaults.baseURL).toBe('https://api2.binance.com/api')
  })
})
