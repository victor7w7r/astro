<script lang="ts">
  import './toggler.css'
  import { themeService } from '@/common/ui/services'

  const { themeStore, toggle } = themeService()

  let dark = $state(false)

  $effect(() => {
  	dark = $themeStore.isDark
  })
</script>

<div class="relative">
  <label
    class="mb-4 inline-flex cursor-pointer items-center"
    for="checked-toggle"
  >
    <input
      id="checked-toggle"
      type="checkbox"
      class="peer sr-only"
      bind:checked={dark}
      onchange={() => toggle()}
    />
    <div
      class="{$themeStore.togglePeer} toggle-design peer"
      data-testid="toggleable"
    ></div>
    <span class="adaptable-text ml-3 select-none text-sm font-medium">
      Dark Mode
    </span>
  </label>
</div>
