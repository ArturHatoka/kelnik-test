<template>
  <div class="filter">
    <VSkeleton v-if="apartmentsStore.isLoading" :lines="4"/>
    <template v-else>
      <VSelectButtons
        v-model="apartmentsStore.filters.rooms"
        :options="apartmentsStore.filterRoomsOptions"
      />

      <VRange
        class="filter__range"
        v-model="apartmentsStore.filters.priceRange"
        :min="1000000"
        :max="20000000"
        label="Стоимость квартиры, ₽"
      />

      <VRange
        class="filter__range"
        v-model="apartmentsStore.filters.areaRange"
        :min="10"
        :max="300"
        label="Площадь, м²"
      />

      <VButton
       class="filter__clear"
        variant="clear"
        @click="apartmentsStore.resetFilters()"
        icon="cross"
        size="s"
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

@media (max-width: 1440px) {
  .filter {
    padding: 20px;

    &__range {
      font-size: px-to-rem(14);
    }

    &__clear {
      font-size: px-to-rem(13);
    }
  }
}
</style>