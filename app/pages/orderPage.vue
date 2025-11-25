<template>
  <div class="order">
    <div class="container">
      <div class="order__item-wr">
        <h2 class="order__item-wr__title">Cart</h2>
        <client-only>
          <Cart_item
            v-for="item in store.cart"
            :key="item.id"
            :cartItem="item"
          />
        </client-only>
      </div>

      <!-- CHECK OUT -->
      <form class="order__checkout">
        <h2 class="order__checkout__title">Check Out</h2>

        <!-- SUMMARY -->
        <div class="order__checkout__order-summary">
          <h4 class="order__checkout__order-summary__title">Order Summary</h4>
          <ClientOnly>
            <p>Total Items: {{ store.totalQuantity }}</p>
            <p>Total Price: {{ store.totalPrice.toFixed(2) }} <span>$</span></p>
          </ClientOnly>
        </div>

        <!-- Type of pay -->
        <div class="order__checkout__payment">
          <h4 class="order__checkout__payment__title">Payment Method:</h4>
          <div class="order__checkout__payment__label-wr">
            <label>
              <input type="radio" name="payment" checked />
              <span> Credit Card </span>
            </label>
            <label>
              <input type="radio" name="payment" />
              <span> PayPal </span>
            </label>
            <label>
              <input type="radio" name="payment" />
              <span> Cash </span>
            </label>
          </div>
        </div>

        <!-- ADRESS -->
        <div class="order__checkout__address">
          <h4 class="order__checkout__address__title">Address:</h4>
          <input type="text" v-model="address" />
        </div>

        <!-- BUTTON -->
        <button class="order__checkout__btn" @click.prevent="handleOrder()">
          To Order
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import Cart_item from "~/assets/components/Cart_item.vue";
import { useStore } from "~/stores/store";
import { useToast } from "vue-toastification";

const store = useStore();
const toast = useToast();

const address = ref("");

function handleOrder() {
  const result = store.toOrder(address);
  if (result.success) toast.success(result.message);
  else toast.warning(result.message);
}
</script>

<style lang="scss" scoped></style>
