<template>
  <button
    :class="['custom-button', 'custom-button--' + variant, icon ? 'custom-button__' + icon : '']"
    v-bind="$attrs">
    <slot/>
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'fill',
    validator: (value: string) => ['fill', 'clear'].includes(value)
  },
  icon: {
    type: String,
    default: null,
    validator: (value: string) => ['cross'].includes(value)
  }
})
</script>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: fit-content;

  &--fill {
    background-color: $main-dark-color;
    color: $white-color;
    border: none;
    &:hover {
      background-color: rgba($main-dark-color, 0.5);
    }
  }

  &--clear {
    background-color: transparent;
    border: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__cross {
    position: relative;
    padding-right: 32px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      right: 16px;
      top: 50%;
      width: 10px;
      height: 2px;
      background-color: currentColor;
      transform: translateY(-50%);
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
</style>