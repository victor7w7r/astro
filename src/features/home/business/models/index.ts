export * from './binance'

export interface UseCase<R> {
  readonly exec: () => Promise<R>
}

export interface UseCaseWithParams<R, P> {
  readonly exec: (params: P) => Promise<R>
}
