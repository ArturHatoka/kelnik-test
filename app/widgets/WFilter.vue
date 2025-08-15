<template>
  <div class="filter">
    <VSkeleton v-if="apartmentsStore.isLoading" :lines="4"/>
    <template v-else>
      <VSelectButtons
        v-model="filters.rooms"
        :options="apartmentsStore.filterRoomsOptions"
      />

      <span>RANGE 1</span>

      <span>RANGE 2</span>

      <button class="btn btn-primary">
        <span>Сбросить параметры</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'
const apartmentsStore = useApartmentsStore()
const filters = {
  rooms: 3
}
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