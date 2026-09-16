describe('inject', () => {
  it('should resolve axiosModule', () => {
    expect.assertions(1)

    const instance = inject.resolve('axiosModule')
    expect(instance).toBeDefined()
  })

  it('should resolve binanceDataSource', () => {
    expect.assertions(1)

    const instance = inject.resolve('binanceDataSource')
    expect(instance).toBeDefined()
  })

  it('should resolve binanceRepository', () => {
    expect.assertions(1)

    const instance = inject.resolve('binanceRepository')
    expect(instance).toBeDefined()
  })

  it('should resolve getBitcoinUseCase', () => {
    expect.assertions(1)

    const instance = inject.resolve('getBitcoinUseCase')
    expect(instance).toBeDefined()
  })
})
