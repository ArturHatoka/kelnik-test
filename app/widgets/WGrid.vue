<template>
  <VSkeleton
    v-if="apartmentsStore.isLoading"
    :lines="20"
    :height="50"
  />
  <div
    v-else
    class="apartments-grid"
  >
    <div class="apartments-grid__row apartments-grid__row--header">
      <span>Планировка</span>
      <span>Квартира</span>
      <VSort
        :is-active="apartmentsStore.filters.sortBy === 'area'"
        :sort-dir="apartmentsStore.filters.sortDir"
        @update:sort="dir => handleSort('area', dir)"
      >
        S, м²
      </VSort>
      <VSort
        :is-active="apartmentsStore.filters.sortBy === 'floor'"
        :sort-dir="apartmentsStore.filters.sortDir"
        @update:sort="dir => handleSort('floor', dir)"
      >
        Этаж
      </VSort>
      <VSort
        :is-active="apartmentsStore.filters.sortBy === 'price'"
        :sort-dir="apartmentsStore.filters.sortDir"
        @update:sort="dir => handleSort('price', dir)"
      >
        Цена, ₽
      </VSort>
    </div>

    <div
      class="apartments-grid__row"
      v-for="apartment in apartmentsStore.visibleApartments"
      :key="apartment.id"
    >
      <div class="apartments-grid__image">
        <img :src="apartment.layout" :alt="'Планировка ' + apartment.id"/>
      </div>
      <span>{{ apartment.rooms }}-комнатная №{{ apartment.id }}</span>
      <span>{{ apartment.area }}</span>
      <span>{{ apartment.floor }} из 17 </span>
      <span>{{ apartment.price }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'
const apartmentsStore = useApartmentsStore()

function handleSort(field: 'area' | 'floor' | 'price', dir: 'asc' | 'desc') {
  apartmentsStore.setSort(field, dir)
}
</script>

<style lang="scss" scoped>
.apartments-grid {
  &__row {
    display: grid;
    grid-template-columns: 1fr 3.5fr 1.5fr 1.5fr 1.5fr;
    gap: 20px;
    align-items: start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 0 24px;

    &--header {
      font-size: px-to-rem(14);
      padding: 0 0 16px;
    }
  }

  &__image {
    width: 80px;
    height: auto;
    padding: 8px;
  }
}
</style>