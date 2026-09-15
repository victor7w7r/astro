<script lang="ts">
  import type { Snippet } from 'svelte'
  import { GetBitcoinUseCase } from '@/home/business/usecases/binance'
  import { container } from '~/modules/di-module'

  let { children }: { children?: Snippet } = $props()

  const getBitcoinUseCase = container.get(GetBitcoinUseCase, {
    autobind: true
  })

  let bit = $state<{ symbol?: string; askPrice?: string } | null>(null)
  let loading = $state(true)

  $effect(() => {
    getBitcoinUseCase.exec()
      .then((data) => {
        bit = data
      })
      .finally(() => {
        loading = false
      })
  })
</script>

{#if loading}
  <p class="adaptable-call">Symbol: {bit?.symbol ?? 'loading'}</p>
  <p class="adaptable-call">Price: {bit?.askPrice ?? 'loading'}</p>
{:else if children}
  {@render children()}
{/if}
