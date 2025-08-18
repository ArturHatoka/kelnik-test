<template>
  <div class="v-select-buttons" v-bind="$attrs">
    <label v-if="label" class="v-select-buttons__label">{{ label }}</label>
    <div class="v-select-buttons__options">
      <label
        v-for="option in options"
        :key="option.value"
        class="v-select-buttons__option"
      >
        <input
          :type="inputType"
          :name="inputName"
          :value="option.value"
          :disabled="option.disabled"
          :checked="isChecked(option.value)"
          @change="handleChange(option.value, $event.target.checked)"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps({
  modelValue: {
    type: [Array, String, Number] as PropType<(string | number)[] | string | number | null>,
    default: () => null
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true
  },
  variant: {
    type: String as PropType<'checkbox' | 'radio'>,
    default: 'checkbox',
    validator: (value: string) => ['checkbox', 'radio'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputType = computed(() => props.variant)

const inputName = computed(() => {
  if (props.variant === 'radio') {
    return props.name || `v-select-buttons-${Math.random().toString(36).substring(2, 9)}`
  }
  return null
})

onMounted(() => {
})

const isChecked = (value: string | number) => {
  if (props.variant === 'checkbox') {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value) || props.modelValue === value
  } else {
    return props.modelValue === value
  }
}

const handleChange = (value: string | number, checked: boolean) => {
  if (props.variant === 'checkbox') {
    let newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    if (checked) {
      newValue.push(value)
    } else {
      newValue = newValue.filter(v => v !== value)
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', value)
  }
}
</script>

<style lang="scss" scoped>
.v-select-buttons {
  &__label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  &__options {
    display: flex;
    gap: 16px;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: $white-color;
    border: 1px solid #ccc;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    transition: 0.3s;

    input {
      appearance: none;
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    &:has(input:checked) {
      background-color: $main-dark-color;
      color: $white-color;
      box-shadow: 0 6px 20px $shadow-green-color;
    }

    &:has(input:disabled) {
      background-color: $white-color;
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:hover {
      background-color: rgba($white-color, 0.5);
    }
  }
}
</style>