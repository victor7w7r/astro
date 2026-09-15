export const imports = [
  {
    '~/di': ['inject'],
    '~/env': ['environment'],
    'fp-ts/lib/function': ['pipe'],
    'vitest-mock-extended': ['mock']
  }
]

export const importTypes = [
  {
    from: 'axios',
    imports: ['AxiosInstance'],
    type: true
  }
]
