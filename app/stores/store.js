import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { useToast } from "vue-toastification/dist/index.mjs";

export const useStore = defineStore("store", () => {
  // CONSTS
  const isAuthenticated = ref(false);
  const userEmail = ref("");
  const cart = ref([]);
  const toast = useToast();

  // COMPUTED
  let totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  let totalQuantity = computed(() =>
    cart.value.reduce((sum, item) => sum + (item.quantity || 0), 0)
  );

  // FUNCTIONS
  function login(email) {
    isAuthenticated.value = true;
    userEmail.value = email;
  }

  function logout() {
    isAuthenticated.value = false;
    userEmail.value = "";
  }

  function addToCart(product, size, quantity) {
    const item = {
      id: product.id + "_" + size, // уникальный товар по размеру
      name: product.name,
      image: product.image,
      category: product.category,
      size: size,
      quantity: quantity,
      price: product.prices[size], // цена для выбранного размера
    };

    // Проверяем, есть ли уже такой товар с этим же размером
    let existing = cart.value.find((el) => el.id === item.id);

    if (existing) {
      existing.quantity += quantity; // просто увеличиваем количество
    } else {
      cart.value.push(item);
    }
  }

  function removeItem(item) {
    cart.value = cart.value.filter((i) => i.id !== item.id);
  }

  function toOrder(address) {
    if (!isAuthenticated.value) {
      return {
        success: false,
        message: "You must be logged in to place an order",
      };
    }

    if (cart.value.length === 0) {
      return { success: false, message: "Your cart is empty" };
    }

    if (address.value.trim() === "") {
      return { success: false, message: "Your address is empty" };
    }

    cart.value = [];
    return { success: true, message: "Thank you! Your order is confirmed" };
  }

  // CHECK
  if (process.client) {
    const saved = localStorage.getItem("cart");
    if (saved) cart.value = JSON.parse(saved);
  }

  watch(
    cart,
    (newCart) => {
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    },
    { deep: true }
  );

  return {
    isAuthenticated,
    userEmail,
    cart,
    totalPrice,
    totalQuantity,
    login,
    logout,
    addToCart,
    removeItem,
    toOrder,
  };
});
