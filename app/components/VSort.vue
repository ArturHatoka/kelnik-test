<template>
  <div
    class="v-sort"
    @click="toggleSort"
    role="button"
    :aria-pressed="isActive"
    v-bind="$attrs"
  >
    <span
      class="v-sort__label"
      :class="{ 'v-sort__label--active': isActive }"
    >
      <slot/>
    </span>
    <div class="v-sort__icons">
      <ChevronIcon
        class="v-sort__icon v-sort__icon--asc"
        :class="{ 'v-sort__icon--active': isActive && sortDir === 'asc' }"
      />
      <ChevronIcon
        class="v-sort__icon v-sort__icon--desc"
        :class="{ 'v-sort__icon--active': isActive && sortDir === 'desc' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronIcon from '~/assets/icons/chevron.svg'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  sortDir: {
    type: String,
    default: 'asc',
    validator: (value: string) => ['asc', 'desc'].includes(value)
  }
})

const emit = defineEmits<{
  (e: 'update:sort', dir: 'asc' | 'desc'): void
}>()

function toggleSort() {
  const newDir = props.sortDir === 'asc' ? 'desc' : 'asc'
  emit('update:sort', newDir)
}
</script>

<style lang="scss" scoped>
.v-sort {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &__label {
    &--active {
      color: $main-dark-color;
    }
  }

  &__icons {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__icon {
    width: 7px;
    height: auto;
    transition: transform 0.2s ease;
    color: rgba($font-main-color, 0.4);

    &--asc {
      transform: rotate(180deg);
    }

    &--desc {
      transform: rotate(0deg);
    }

    &--active {
      color: $main-dark-color;
    }
  }
}
</style>