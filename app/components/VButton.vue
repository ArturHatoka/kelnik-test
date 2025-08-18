<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String,
    default: 'rounded',
    validator: (value: string) => ['rounded', 'clear'].includes(value)
  },
  icon: {
    type: String,
    default: null,
    validator: (value: string) => ['cross'].includes(value)
  },
  size: {
    type: String,
    default: 'm',
    validator: (value: string) => ['s', 'm'].includes(value),
  },
})

const buttonClasses = computed(() => [
  'custom-button',
  `custom-button--${props.variant}`,
  props.icon ? `custom-button__${props.icon}` : '',
  `custom-button--${props.size}`,
])
</script>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: fit-content;
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }

  &--rounded {
    border: 1px solid rgba($font-main-color, 0.2);
    border-radius: 25px;
  }

  &--clear {
    border: none;
    background-color: transparent;
  }

  &--s {
    padding: 6px 16px;
  }

  &--m {
    padding: 8px 24px;
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