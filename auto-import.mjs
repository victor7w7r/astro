export const imports = [
  {
    '@/common/ui/services': ['dataService', 'modeService'],
    '~/env': ['environment'],
    '~/modules/di-module': ['container'],
    'lit': ['html', 'LitElement'],
    'lit/decorators.js': ['customElement', 'state'],
    'svelte/store': ['fromStore'],
    'vitest-mock-extended': ['mock']
  }
]

export const importTypes = [
  {
    from: '@/common/ui/services',
    imports: ['Accent'],
    type: true
  }
]
