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
      <span class="apartments-grid__name">{{ apartment.rooms }}-комнатная №{{ apartment.id }}</span>
      <div class="apartments-grid__data">
        <span class="apartments-grid__area">{{ apartment.area }}</span>
        <div class="apartments-grid__floor"><span>{{ apartment.floor }} </span> <span class="opacity--50">из 17</span></div>
        <span class="apartments-grid__price">{{ apartment.price }}</span>
      </div>
    </div>

    <div
      v-if="apartmentsStore.hasMore"
      class="apartments-grid__row apartments-grid__row--load-more"
      @click="apartmentsStore.showMore"
    >
      <VButton class="apartments-grid__load-more">
        Загрузить еще
      </VButton>
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
  display: flex;
  flex-direction: column;

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

    &--load-more {
      border-bottom: none;
      padding: 48px 0 0;
      display: flex;
      grid-template-columns: none;
    }
  }

  &__image {
    width: 80px;
    height: auto;
    padding: 8px;
  }
  &__data {
    display: contents;
  }
}

@media (max-width: 1440px) {
  .apartments-grid {
    gap: 4px;

    &__row {
      display: grid;
      grid-template-columns: 1fr 80px;
      grid-template-areas:
        "name image"
        "data image"
        "empty image";
      gap: 16px 20px;
      align-items: start;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 16px 24px;
      font-size: px-to-rem(14);

      &--header {
        display: flex;
        grid-template-columns: none;
        border: none;
        padding: 8px 0;

        span:nth-child(1),
        span:nth-child(2) {
          display: none;
        }
      }

      &--load-more {
        font-size: px-to-rem(15);
        padding: 24px 0 0;
        border: none;
        display: flex;
        grid-template-columns: none;
      }
    }

    &__image {
      grid-area: image;
     }

    &__name {
      grid-area: name;
    }

    &__data {
      grid-area: data;
      display: flex;
      gap: 20px;
    }

    &__load-more {
      font-size: px-to-rem(15);
    }
  }
}
</style>