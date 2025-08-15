<template>
  <div class="container apartments">
    <div class="apartments__main">
      <VTitle class="apartments__title">
        Квартиры
      </VTitle>
      <div class="apartments__list">
        <WGrid/>
      </div>
    </div>
    <div class="apartments__filter">
      <WFilter/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'
import WFilter from "../widgets/WFilter.vue";
import WGrid from "../widgets/WGrid.vue";

const store = useApartmentsStore()
const { loadData } = store

onMounted(async () => {
  await loadData()
})

onUnmounted(() => {
})

</script>