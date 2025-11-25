<template>
  <div class="card">
    <div class="card__img">
      <img :src="props.cartItem?.image" alt="" />
    </div>
    <div class="card__text-wr">
      <h2 class="card__title">{{ props.cartItem?.name }}</h2>
      <p class="card__type">Type: {{ props.cartItem?.category }}</p>
      <span class="card__size">Size: {{ props.cartItem?.size }}</span>
      <span class="card__quantity"
        >Quantity: {{ props.cartItem?.quantity }}</span
      >
    </div>
    <div class="card__price">
      <span>{{ props.cartItem?.price ?? 0 }}<span>$</span></span>
      <button
        class="card__removeItem"
        @click="store.removeItem(props.cartItem)"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/store";

const store = useStore();
const props = defineProps({
  cartItem: Object,
});
</script>

<style lang="scss" scoped>
@import "../scss/mixins";

.card {
  width: 100%;
  height: 100%;
  max-height: 145px;
  display: flex;
  align-items: center;

  padding-bottom: 25px;
  border-bottom: 1px solid #e5e7eb;

  @include media(480px) {
    max-height: 117px;
  }

  &__img {
    width: 94px;
    height: 94px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;

    @include media(480px) {
      width: 80px;
      height: 80px;
    }

    img {
      width: 71px;
      height: 71px;
      object-fit: cover;
      display: flex;
    }
  }

  &__text-wr {
    height: 100%;
    max-height: 88px;
    margin-right: auto;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: start;

    @include media(480px) {
      max-height: 74px;
    }
  }

  &__title,
  &__price {
    font-weight: 500;
    font-size: 16px;
    line-height: 1;
    color: #111827;
    margin-bottom: 4px;

    @include media(480px) {
      margin-bottom: 2px;
      font-size: 14px;
    }

    span {
      font-family: sans-serif;
    }
  }

  &__type {
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    color: #6b7280;
    margin-bottom: 2px;

    @include media(480px) {
      font-size: 12px;
    }
  }

  &__size {
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    color: #6b7280;

    margin-bottom: auto;
    @include media(480px) {
      font-size: 12px;
    }
  }

  &__quantity {
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    color: #6b7280;

    @include media(480px) {
      font-size: 12px;
    }
  }

  &__price {
    height: 100%;
    max-height: 88px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    @include media(480px) {
      max-height: 74px;
    }
  }

  &__removeItem {
    font-weight: 500;
    font-size: 16px;
    line-height: 1;

    background: var(--main-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    transition: all 0.1s ease;
    cursor: pointer;

    @include media(480px) {
      font-size: 14px;
    }

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
}
</style>
