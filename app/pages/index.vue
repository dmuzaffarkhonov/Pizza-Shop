<template>
  <!-- HERO -->
  <div class="hero">
    <div class="container">
      <div class="hero__text-wr">
        <h2 class="hero__title">
          The Fastest <br />
          Pizza Delivery
        </h2>
        <p class="hero__desc">
          We will deliver juicy pizza for your family in 30 minutes, if the
          courier is late <span>- pizza is free!</span>
        </p>
        <div class="hero__cooking-prc">
          <span> Cooking process: </span>
          <div class="hero__cooking-prc__img">
            <img src="../assets/images/jpg/cooking.jpg" alt="" />
            <NuxtLink
              to="https://www.youtube.com/watch?v=uNGZAMx3w-c"
              class="play"
            >
              <svg
                width="25"
                height="27"
                viewBox="0 0 25 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5714 13.657C22.5714 14.1929 22.2854 14.6879 21.8214 14.9558L4.46399 24.9773C3.99992 25.2452 3.42802 25.2452 2.96399 24.9773C2.50007 24.7094 2.21406 24.2142 2.21399 23.6785L2.21399 3.63553C2.21416 3.09985 2.50008 2.60458 2.96399 2.3367C3.42798 2.06881 3.99995 2.06894 4.46399 2.3367L21.8214 12.3582L21.9865 12.4685C22.3523 12.7501 22.5714 13.188 22.5714 13.657Z"
                  stroke="url(#paint0_linear_9_43)"
                  stroke-width="3"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_9_43"
                    x1="21.0714"
                    y1="22.0149"
                    x2="18.2406"
                    y2="2.64074"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF6432" />
                    <stop offset="1" stop-color="#FFA228" />
                  </linearGradient>
                </defs>
              </svg>
            </NuxtLink>
          </div>
        </div>
        <div class="hero__btn-wr">
          <NuxtLink to="/orderPage" class="toOrder">To order</NuxtLink>
          <button
            class="pizzaMenu"
            @click.prevent="scrollToIdFromQuery('menu')"
          >
            Pizza<span>-</span>Menu
          </button>
        </div>
      </div>
      <div class="hero__img">
        <img
          src="../assets/images/png/hero-pizza.png"
          alt=""
          class="main-img"
        />
      </div>
    </div>
  </div>

  <!-- MENU -->
  <div id="menu" class="menu">
    <div class="container">
      <h2 class="menu__title">Menu</h2>
      <ul class="menu__type-wr">
        <li v-for="type in categories" :key="type.value">
          <button
            class="type"
            :class="{ active: selectedType === type.value }"
            @click="selectedType = type.value"
          >
            <span>{{ type.name }}</span>
          </button>
        </li>
      </ul>
      <div class="menu__card-wr">
        <Product_card
          v-for="item in filteredPizzas"
          :key="item.id"
          :data="item"
        ></Product_card>
      </div>
    </div>
  </div>

  <!-- EVENTS -->
  <div id="events" class="events">
    <div class="container">
      <div class="events__wr">
        <!-- ROW-1 -->
        <div class="row row-1">
          <div class="item">
            <img
              src="../assets/images/jpg/events/cooking.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">HOW WE COOKING</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
          <div class="item blog">
            <img
              src="../assets/images/jpg/events/our_blog.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">OUR BLOG</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
          <div class="events__text-wr">
            <h2 class="events__title">Events</h2>
            <p class="events__desc">
              There are regular events in our pizzeria that will allow you to
              eat delicious food for a lower price
            </p>
          </div>
        </div>

        <!-- ROW-2 -->
        <div class="row row-2">
          <div class="item price">
            <img
              src="../assets/images/jpg/events/for_1_price.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">TWO PIZZA FOR 1 PRICE</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
          <div class="item tour">
            <img
              src="../assets/images/jpg/events/kitchen_tour.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">KITCHEN TOUR</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
        </div>

        <!-- ROW-3 -->
        <div class="row row-3">
          <div class="item for_pizza">
            <img
              src="../assets/images/jpg/events/for_3_pizza.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">FREE COFFEE FOR 3 PIZZA</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
          <div class="item inst">
            <img
              src="../assets/images/jpg/events/instagram.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">OUR INSTAGRAM</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
          <div class="item choose">
            <img
              src="../assets/images/jpg/events/choose.jpg"
              alt=""
              class="item__img"
            />
            <h2 class="item__title">WHERE ARE YOU CHOOSE US?</h2>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
              class="item__btn"
            >
              More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ABOUT US -->
  <div id="about" class="about">
    <div class="container">
      <div class="about__text-wr">
        <h2 class="about__title">About us</h2>
        <p class="about__desc">
          In just a couple of years, we have opened 6 outlets in different
          cities: Kazan, Chelyabinsk, Ufa, Samara, Izhevsk, and in the future we
          plan to develop the network in other major cities of Russia.
        </p>
        <img
          src="../assets/images/png/about__pizza.png"
          alt=""
          class="about__pizzas"
        />
        <p class="about__desc about__bt_desc">
          The kitchen of each point is at least<span>: 4</span
          >00<span>-</span>500 sq. m. meters, hundreds of employees, smoothly
          performing work in order to receive <span>/</span> prepare
          <span>/</span> form <span>/</span> deliver customer orders on time.
        </p>
      </div>
      <img
        src="../assets/images/jpg/about_main_img.jpg"
        alt=""
        class="about__img"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import Product_card from "~/assets/components/Product_card.vue";
import categories from "~/assets/data/categories.json";
import pizzas from "~/assets/data/data.json";

const route = useRoute();
const router = useRouter();

const selectedType = ref("all");
const filteredPizzas = computed(() => {
  if (selectedType.value === "all") return pizzas;
  return pizzas.filter((pizza) => pizza.category === selectedType.value);
});

// SCROLL TO
const scrollToIdFromQuery = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  router.replace({ query: {} });
};

// ON MOUNTED
onMounted(() => {
  const scrollId = route.query.scrollTo;
  if (scrollId) scrollToIdFromQuery(scrollId);
});

// WATCH
watch(
  () => route.query.scrollTo,
  (newId) => {
    if (newId) scrollToIdFromQuery(newId);
  }
);
</script>

<style lang="scss" scoped></style>
