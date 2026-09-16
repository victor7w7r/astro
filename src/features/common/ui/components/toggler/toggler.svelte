<script lang="ts">
  import { useDarkTheme } from './toggler.svelte.ts'

  const theme = useDarkTheme()
</script>

<div class="relative">
  <label class="mb-4 inline-flex cursor-pointer items-center">
    <button
      type="button"
      role="switch"
      aria-checked={theme.dark}
      aria-label="Toggle dark mode"
      class={`toggle-design ${theme.dark ? 'theme-toggle-active after:translate-x-full' : ''}`}
      data-testid="toggleable"
      onclick={theme.toggle}
    ></button>
    <span
      class='text-slate-900 dark:text-slate-300 ml-3 select-none text-sm font-medium'
    >
      Dark Mode
    </span>
  </label>
</div>
