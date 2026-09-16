<script setup lang="ts">
  import { useStore } from '@nanostores/vue'

  import { dataService, type Accent } from '@/common/ui/services'

  const { setAccent, dataStore } = dataService()
  const data = useStore(dataStore)

  const colors: ReadonlyArray<{
    name: Accent
    label: string
    className: string
  }> = [
    {
      name: 'purple',
      label: 'Select purple theme',
      className: 'bg-[#6603fc]'
    },
    {
      name: 'magenta',
      label: 'Select magenta theme',
      className: 'bg-[#9c1c85] shadow-lg shadow-[#9c1c85]/40'
    },
    {
      name: 'teal',
      label: 'Select teal theme',
      className: 'bg-[#1c959c] shadow-lg shadow-[#1c959c]/40'
    }
  ]
</script>

<template>
  <div class="mt-6 flex w-full items-center justify-center gap-5">
    <button
      v-for="color in colors"
      :key="color.name"
      :aria-label="color.label"
      :class="[
        'color-button',
        color.className,
        data.color === color.name && 'color-button-selected'
      ]"
      type="button"
      @click="setAccent(color.name)"
    ></button>
  </div>
</template>
