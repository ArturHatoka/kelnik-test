<template>
  <transition name="fade">
    <button
      v-if="isVisible"
      class="v-scroll-top"
      @click="scrollToTop"
    >
      <ArrowIcon class="v-scroll-top__icon" />
    </button>
  </transition>
</template>

<script setup lang="ts">
import ArrowIcon from '~/assets/icons/arrow.svg'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)

function checkScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped lang="scss">
.v-scroll-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: $green-gradient;
  color: $white-color;
  cursor: pointer;
  transition: filter 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(1.1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
