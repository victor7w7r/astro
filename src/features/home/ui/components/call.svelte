<script lang="ts">
import type { Snippet } from 'svelte'

import { bitcoinPromise, formatPrice } from './call.svelte.ts'

// oxlint-disable-next-line toplevel/no-toplevel-let
let { children }: { children?: Snippet } = $props()
</script>

<div
  class='glass-panel relative w-full max-w-md border-white/15 bg-white/8 p-5 accent-shadow transition duration-500 hover:-translate-y-2 hover:rotate-1 sm:p-8'
>
  <div class='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
    <div class='inline-group'>
      <span class='grid size-12 place-items-center rounded-2xl accent-gradient text-2xl font-black text-white accent-shadow'>
        ₿
      </span>
      <div>
        <p class='font-bold tracking-tight'>Bitcoin</p>
        <p class='text-xs font-medium text-white/55'>BTC / USDT</p>
      </div>
    </div>
    <span class='flex items-center gap-2 rounded-full bg-[color:var(--accent)]/15 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest accent-text'>
      <span class='size-1.5 animate-pulse rounded-full accent-bg'></span>
      Live
    </span>
  </div>
  <div class='mt-2'>
    <p class='text-sm font-medium text-white/55'>Current ask price</p>
    {#await bitcoinPromise}
      <div class='mt-3 flex items-center justify-start'>
        {@render children?.()}
      </div>
    {:then bit}
      <p class='text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl'>
        {formatPrice(bit.price)}
      </p>
      <div class='mt-1 flex items-center gap-2 text-sm'>
        <span class='font-bold accent-text'>
          {bit.symbol === 'ERR' ? 'Feed unavailable' : bit.symbol}
        </span>
      </div>
    {:catch}
      <p class='mt-1 text-sm font-medium text-white/55'>
        Price unavailable right now.
      </p>
    {/await}
  </div>
</div>
