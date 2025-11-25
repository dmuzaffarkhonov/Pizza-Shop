<template>
  <div class="card">
    <img :src="props.data?.image" alt="" class="card__img" />

    <h2 class="card__title">{{ props.data?.name }}</h2>

    <p class="card__filling">Filling: {{ props.data?.filling.join(", ") }}</p>

    <ul class="card__size-wr">
      <li v-for="size in props.data?.sizes" :key="size">
        <button
          class="size"
          :class="{ active: size === selectedSize }"
          @click="selectedSize = size"
        >
          <span>{{ size }}</span>
        </button>
      </li>
    </ul>

    <div class="card__info">
      <p class="price">
        {{ props.data?.prices[selectedSize] }}
        <img src="../images/svg/card_svg/dollar.svg" alt="" />
      </p>
      <ul class="quantitiyInfo">
        <li>
          <button class="minus" @click="remQn()">
            <img src="../images/svg/card_svg/minus.svg" alt="" />
          </button>
        </li>
        <li>
          <span class="quantity">{{ quantity }}</span>
        </li>
        <li>
          <button class="plus" @click="addQn()">
            <img src="../images/svg/card_svg/plus.svg" alt="" />
          </button>
        </li>
      </ul>
    </div>

    <button
      class="card__toOrder"
      @click="store.addToCart(props.data, selectedSize, quantity)"
    >
      Order Now
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "~/stores/store";

const store = useStore();

const props = defineProps({
  data: Object,
});

function remQn() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addQn() {
  if (quantity.value < 10) {
    quantity.value++;
  }
}

const quantity = ref(props.data?.quantity || 1);

const selectedSize = ref(props.data?.sizes[0]);
</script>

<style lang="scss" scoped>
@import "../scss/mixins";

.card {
  width: 297px;
  height: 400px;
  border-radius: 30px;
  background-color: #210a01;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  padding: 0 34px 23px;

  margin-bottom: 57px;

  @include media(686px) {
    width: 180px;
    height: 256.66px;
    padding: 0 18px 14px;
    border-radius: 18px;
    margin-bottom: 0;
  }

  @include media(427px) {
    width: 146px;
    height: 231px;
    padding: 0 12px 10px;
  }

  &__img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -36%);

    width: 157px;
    height: 157px;
    object-fit: cover;
    display: flex;

    filter: drop-shadow(0px 0px 25px 0px #ff8a002e);
    margin-bottom: 20px;

    @include media(686px) {
      width: 96px;
      height: 96px;
      margin-bottom: 12px;
      transform: translate(-50%, -36%);
    }
  }

  &__title {
    font-weight: 500;
    font-size: 25.1px;
    line-height: 1.1;
    color: var(--title-color);

    margin: 120px 0 20px;

    @include media(686px) {
      font-size: 15.35px;
      margin: 73px 0 12px;
    }
  }

  &__filling {
    font-weight: 400;
    font-size: 14.32px;
    line-height: 1.1;
    color: var(--text-color);
    margin-bottom: 20px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;

    @include media(686px) {
      font-size: 8.76px;
      margin-bottom: 12px;
    }

    @include media(427px) {
      font-size: 8px;
      margin-bottom: 10px;
    }
  }

  &__size-wr {
    display: flex;
    align-items: center;
    gap: 37px;
    margin-bottom: 20px;

    @include media(686px) {
      margin-bottom: 12px;
      gap: 22px;
    }

    @include media(427px) {
      margin-bottom: 10px;
    }

    li .size {
      position: relative;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      font-weight: 400;
      font-size: 14.32px;
      color: var(--text-color);
      line-height: 1;

      border: 1.5px solid #a3a3a3;

      cursor: pointer;
      transition: opacity 0.1s ease;

      display: flex;
      align-items: center;
      justify-content: center;

      @include media(686px) {
        width: 25px;
        height: 25px;
        font-size: 8.76px;
        border: 0.96px solid #a3a3a3;
      }

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--main-gradient);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 0;
      }

      &:hover {
        border: none;
        color: var(--title-color);

        &::before {
          opacity: 1;
        }
      }

      &:active {
        opacity: 0.8;
      }

      span {
        position: relative;
        z-index: 1;
        transform: translateY(0.5px);
      }
    }

    li .active {
      border: none;
      color: var(--title-color);

      &::before {
        opacity: 1;
      }

      &:hover,
      &:active {
        opacity: 1;
      }
    }
  }

  &__view {
    width: 100%;
    max-width: 194px;

    border: 1.5px solid #ffa229;
    padding: 10px 51px 10px;
    border-radius: 84.37px;

    box-shadow: 0px 7.59px 33.75px 0px #ff6b000f;

    display: flex;
    justify-content: center;

    font-weight: 400;
    font-size: 16px;
    line-height: 1.1;

    background: var(--main-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    margin-bottom: 20px;
    transition: all 0.1s ease;

    @include media(686px) {
      max-width: 119px;

      font-size: 9.83px;
      margin-bottom: 12px;
      border-radius: 52px;
      padding: 5.5px 31px;
    }

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }

  &__info {
    width: 100%;
    max-width: 194px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 21px;

    @include media(686px) {
      max-width: 119px;
    }

    @include media(427px) {
      margin-bottom: 10px;
    }

    .price {
      font-weight: 500;
      font-size: 25.46px;
      line-height: 1.1;
      color: var(--title-color);

      display: flex;
      gap: 1.76px;

      @include media(686px) {
        font-size: 15.57px;
        gap: 0.48px;
      }

      img {
        transform: translateY(-4px);

        @include media(686px) {
          width: 7px;
          height: 11px;
          object-fit: cover;
          display: flex;

          transform: translateY(-2px);
        }
      }
    }

    .quantitiyInfo {
      width: 100%;
      max-width: 82px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include media(686px) {
        max-width: 50px;
      }

      .quantity {
        font-weight: 400;
        font-size: 22.82px;
        line-height: 1.1;
        color: var(--text-color);

        @include media(686px) {
          font-size: 14px;
        }
      }

      button {
        width: 23px;
        height: 23px;
        border-radius: 50%;

        border: 1px solid var(--text-color);

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        transition: all 0.1s ease;

        @include media(686px) {
          width: 14px;
          height: 14px;
        }

        img {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &:hover {
          opacity: 0.8;
        }

        &:active {
          opacity: 0.6;
        }
      }

      .plus {
        border: none;
        background: var(--main-gradient);

        img {
          @include media(686px) {
            width: 6.11px;
            height: 9.17px;
            display: flex;
          }
        }
      }

      .minus img {
        @include media(686px) {
          width: 5.1px;
          height: 11.01px;
          display: flex;
          transform: translateX(0.7px);
        }
      }
    }
  }

  &__toOrder {
    @include pr-btn;

    padding: 14px 52.5px;

    @include media(686px) {
      width: 100%;
      max-width: 119px;

      padding: 8px 31px;
      font-size: 10.67px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 52px;
    }

    @include media(427px) {
      padding: 7px;
    }
  }
}
</style>
