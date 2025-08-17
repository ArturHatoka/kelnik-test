<template>
  <div class="filter">
    <VSkeleton v-if="apartmentsStore.isLoading" :lines="4"/>
    <template v-else>
      <VSelectButtons
        v-model="apartmentsStore.filters.rooms"
        :options="apartmentsStore.filterRoomsOptions"
      />

      <VRange
        v-model="apartmentsStore.filters.priceRange"
        :min="1000000"
        :max="20000000"
        label="Стоимость квартиры, ₽"
      />

      <VRange
        v-model="apartmentsStore.filters.areaRange"
        :min="10"
        :max="300"
        label="Площадь, м²"
      />

      <VButton
        variant="clear"
        @click="apartmentsStore.resetFilters()"
        icon="cross"
      >
        Сбросить параметры
      </VButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'
const apartmentsStore = useApartmentsStore()
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  background: $green-gradient;
  border-radius: 10px;
}
</style>