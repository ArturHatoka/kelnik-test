<template>
  <div class="apartments-grid">
    <div class="apartments-grid__row apartments-grid__row--header">
      <span>Планировка</span>
      <span>Квартира</span>
      <span>S, м²</span>
      <span>Этаж</span>
      <span>Цена, ₽</span>
    </div>

    <div class="apartments-grid__row">
      <div class="apartments-grid__image">
        <img src="/img/n104.webp"/>
      </div>
      <span>3-комнатная №104</span>
      <span>63,1</span>
      <span>1 из 17 </span>
      <span>6 630 500</span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.apartments-grid {

  &__row {
    display: grid;
    grid-template-columns: 1fr 3.5fr 1.5fr 1.5fr 1.5fr;
    gap: 20px;
    align-items: start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 0 24px;

    &--header {
      font-size: px-to-rem(14);
      padding: 0 0 16px;
    }
  }

  &__image {
    width: 80px;
    height: auto;
    padding: 8px;
  }
}
</style>