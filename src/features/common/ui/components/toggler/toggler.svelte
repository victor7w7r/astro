<script lang="ts">
  import { themeService } from '@/common/ui/services'

  const { themeStore, toggle } = themeService()

  let { contrast = false }: { contrast?: boolean } = $props()

  let dark = $state(false)

  $effect(() => {
  	dark = $themeStore.isDark
  })
</script>

<div class="relative">
  <label class="mb-4 inline-flex cursor-pointer items-center">
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      class={`toggle-design ${dark ? 'theme-toggle-active after:translate-x-full' : ''}`}
      data-testid="toggleable"
      onclick={toggle}
    ></button>
    <span
      class={`${contrast ? 'text-white/80' : 'text-slate-900 dark:text-slate-300'} ml-3 select-none text-sm font-medium`}
    >
      Dark Mode
    </span>
  </label>
</div>
