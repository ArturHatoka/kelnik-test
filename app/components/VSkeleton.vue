<template>
  <div class="skeleton-loader">
    <div
      v-for="i in lines"
      :key="i"
      class="skeleton-item"
      :style="{ height: `${height}px` }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  lines: {
    type: Number,
    default: 1
  },
  height: {
    type: Number,
    default: 30
  }
})
</script>

<style lang="scss" scoped>
.skeleton-loader {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeleton-item {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  width: 100%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>