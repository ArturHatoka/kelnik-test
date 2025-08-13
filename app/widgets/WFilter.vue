<template>
  <div class="filter">
    <VSelectButtons
      v-model="filters.rooms"
      :options="roomsOptions"
    />

    <span>RANGE 1</span>

    <span>RANGE 2</span>

    <button class="btn btn-primary">
      <span>Сбросить параметры</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const roomsOptions = [
  { label: '1к', value: 1 },
  { label: '2к', value: 2 },
  { label: '3к', value: 3 },
  { label: '4к', value: 4, disabled: true },
]

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