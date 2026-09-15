<script setup lang="ts">
  import { useStore } from '@nanostores/vue'

  import { dataService } from '@/common/ui/services'

  const { dataStore } = dataService()

  const data = useStore(dataStore)
</script>

<template>
  <p class="adaptable-center-text text-base font-semibold lg:text-xl">
    Store State:&nbsp;
    <template v-if="data === undefined"> Not yet.</template>
    <template v-else>
      Yes, you write <b>{{ data }}</b>
    </template>
  </p>
</template>
