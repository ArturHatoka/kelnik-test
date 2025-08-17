<template>
  <div class="v-range">
    <label v-if="label" class="v-range__label">{{ label }}</label>
    <div class="v-range__options">
      <div class="v-range__option">
        <span class="opacity--50">от </span>
        <span>{{ splitBigNumber(localValue[0]) }}</span>
      </div>
      <div class="v-range__option">
        <span class="opacity--50">до </span>
        <span>{{ splitBigNumber(localValue[1]) }}</span>
      </div>
    </div>
    <ClientOnly>
      <VueSlider
        v-model="localValue"
        :min="min"
        :max="max"
        aria-label="ariaLabel"
        :tooltip="'none'"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import VueSlider from 'vue-slider-component'
import { splitBigNumber } from "~/helpers/utils";

const props = defineProps({
  modelValue: {
    type: Array as PropType<[number, number]>,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(localValue, (newVal) => {
  emit('update:modelValue', newVal)
})

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})
</script>

<style lang="scss" scoped>
.v-range {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__options {
    display: flex;
    justify-content: space-between;
  }
}

:deep(.vue-slider) {
  height: 3px !important;
  padding: 5px 0 !important;
}

:deep(.vue-slider-rail) {
  background: rgba($font-main-color, 0.1);
  border-radius: 1.5px;
}

:deep(.vue-slider-process) {
  background: $main-dark-color;
}

:deep(.vue-slider-dot) {
  background: $main-dark-color;
  border-radius: 50%;
}
</style>