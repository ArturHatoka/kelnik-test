<template>
  <component
    :is="variant"
    :class="['custom-' + variant]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'h1',
    validator: (value: string) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  }
})
</script>

<style lang="scss" scoped>
.custom {
  &-h1 {
    font-size: px-to-rem(54);
    font-weight: bold;
  }
}
</style>