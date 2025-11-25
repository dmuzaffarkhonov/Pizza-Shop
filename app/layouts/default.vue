<template>
  <div class="wrapper">
    <!-- OVERLAY -->
    <div
      class="overlay"
      v-show="burgerMenu || cartBoard"
      @click="closeAllModals()"
    ></div>

    <!-- CART -->
    <Transition name="cartBoardTrs">
      <div class="cartBoard" v-show="cartBoard">
        <div class="cartBoard__header">
          <h2 class="cartBoard__header__title">Shopping cart</h2>
          <button
            class="cartBoard__header__close-menu"
            @click="cartBoardToggle()"
          >
            <svg
              width="20"
              height="20"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
            >
              <path
                fill="#a3a3a3"
                d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
              />
            </svg>
          </button>
        </div>
        <div class="cartBoard__card-wr">
          <client-only>
            <Cart_item
              v-for="item in store.cart"
              :key="item.id"
              :cartItem="item"
            />
          </client-only>
        </div>
        <div class="cartBoard__footer">
          <div class="total">
            <div class="total__text-wr">
              <h2 class="total__title">Subtotal</h2>
              <p class="total__desc">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <span class="total__price">
              <span>$</span>
              <client-only>{{ store.totalPrice.toFixed(2) }}</client-only>
            </span>
          </div>
          <NuxtLink
            to="/orderPage"
            @click="closeAllModals()"
            class="cartBoard__footer__orderBtn"
            >To Order</NuxtLink
          >
        </div>
      </div>
    </Transition>

    <!-- HEADER -->
    <header class="header">
      <div class="container">
        <NuxtLink to="/" class="header__logo">
          <svg
            width="160"
            height="34"
            viewBox="0 0 160 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.84563 11.866C6.29973 11.094 6.99224 10.4469 7.92315 9.9247C8.87677 9.40248 10.0347 9.14137 11.3971 9.14137C12.714 9.14137 13.8946 9.39113 14.9391 9.89064C15.9835 10.3902 16.8122 11.06 17.4253 11.9001C18.0383 12.7401 18.5038 13.6711 18.8217 14.6928C19.1395 15.6918 19.2985 16.7363 19.2985 17.8261C19.2985 18.916 19.1395 19.9718 18.8217 20.9935C18.5038 21.9925 18.0383 22.9121 17.4253 23.7522C16.8122 24.5923 15.9835 25.2621 14.9391 25.7616C13.8946 26.2611 12.714 26.5109 11.3971 26.5109C9.33088 26.5109 7.70745 25.8978 6.52678 24.6717V33.4927H0.73695V9.65224H5.84563V11.866ZM12.4188 20.5848C13.0318 19.8128 13.3384 18.8933 13.3384 17.8261C13.3384 16.759 13.0318 15.8394 12.4188 15.0674C11.8285 14.2955 10.9657 13.9095 9.83039 13.9095C9.08112 13.9095 8.41132 14.1138 7.82098 14.5225C7.23064 14.9085 6.79925 15.3853 6.52678 15.9529V19.6993C6.79925 20.2669 7.23064 20.7551 7.82098 21.1638C8.41132 21.5498 9.08112 21.7428 9.83039 21.7428C10.9657 21.7428 11.8285 21.3568 12.4188 20.5848ZM27.8137 26H22.0239V9.65224H27.8137V26ZM28.2224 4.13487C28.2224 5.20201 27.9046 6.00805 27.2688 6.55297C26.6558 7.07519 25.8724 7.3363 24.9188 7.3363C23.9652 7.3363 23.1705 7.07519 22.5348 6.55297C21.9217 6.00805 21.6152 5.20201 21.6152 4.13487C21.6152 3.09043 21.9331 2.3071 22.5688 1.78488C23.2046 1.23995 23.9879 0.967488 24.9188 0.967488C25.8724 0.967488 26.6558 1.23995 27.2688 1.78488C27.9046 2.3071 28.2224 3.09043 28.2224 4.13487ZM31.0633 9.65224H44.8568V13.058L38.2495 21.2319H45.3336V26H30.5865V22.5942L37.2278 14.4203H31.0633V9.65224ZM47.8262 9.65224H61.6196V13.058L55.0124 21.2319H62.0964V26H47.3494V22.5942L53.9906 14.4203H47.8262V9.65224ZM80.3237 21.3341C80.3237 22.0152 80.6984 22.3558 81.4476 22.3558C81.6747 22.3558 81.8904 22.3218 82.0947 22.2536V25.8297C81.2319 26.1703 80.2556 26.3406 79.1658 26.3406C77.3494 26.3406 76.0552 25.7389 75.2832 24.5355C73.603 25.8524 71.7071 26.5109 69.5955 26.5109C67.9834 26.5109 66.6325 26.0568 65.5426 25.1486C64.4528 24.2403 63.9079 23.0143 63.9079 21.4703C63.9079 20.494 64.1236 19.6425 64.555 18.916C64.9864 18.1667 65.554 17.5991 66.2578 17.2131C66.9844 16.8271 67.7337 16.5433 68.5057 16.3616C69.3003 16.18 70.1291 16.0892 70.9919 16.0892C72.218 16.0892 73.3986 16.214 74.5339 16.4638V15.8848C74.5339 15.2718 74.2387 14.7836 73.6484 14.4203C73.0808 14.0343 72.2407 13.8414 71.1281 13.8414C69.4025 13.8414 67.4953 14.2614 65.4064 15.1015V10.2312C67.6315 9.50465 69.7545 9.14137 71.7752 9.14137C74.568 9.14137 76.6909 9.72035 78.144 10.8783C79.5972 12.0363 80.3237 14.0003 80.3237 16.7703V21.3341ZM69.868 20.9935C69.868 21.4476 70.0496 21.8336 70.4129 22.1515C70.7762 22.4466 71.253 22.5942 71.8433 22.5942C72.8651 22.5942 73.7619 22.3104 74.5339 21.7428V19.529C73.9209 19.3247 73.2284 19.2225 72.4564 19.2225C70.7308 19.2225 69.868 19.8128 69.868 20.9935ZM83.6063 14.3522C83.6063 12.5131 84.2761 11.1848 85.6157 10.3675C86.9553 9.55006 88.6582 9.14137 90.7244 9.14137C92.8587 9.14137 94.9135 9.60683 96.8889 10.5377V15.1355C96.1623 14.636 95.2541 14.2273 94.1643 13.9095C93.0971 13.5689 92.0867 13.3986 91.1331 13.3986C90.0887 13.3986 89.5664 13.6711 89.5664 14.216C89.5664 14.6247 89.8616 14.9653 90.4519 15.2377C91.0423 15.4875 91.7575 15.7259 92.5976 15.9529C93.4377 16.18 94.2778 16.4638 95.1179 16.8044C95.958 17.1223 96.6732 17.6558 97.2635 18.4051C97.8539 19.1544 98.149 20.0966 98.149 21.2319C98.149 24.7512 95.5493 26.5109 90.3498 26.5109C87.716 26.5109 85.5249 26.0114 83.7766 25.0123V20.4145C85.5249 21.5725 87.6138 22.1515 90.0433 22.1515C91.4737 22.1515 92.1889 21.879 92.1889 21.3341C92.1889 20.9481 91.8937 20.6302 91.3034 20.3805C90.7131 20.108 89.9978 19.8582 89.1578 19.6312C88.3177 19.4041 87.4776 19.1203 86.6375 18.7797C85.7974 18.4165 85.0822 17.8602 84.4918 17.1109C83.9015 16.3616 83.6063 15.4421 83.6063 14.3522ZM100.749 2.15951H106.538V10.8783C107.833 9.72035 109.343 9.14137 111.068 9.14137C113.202 9.14137 114.826 9.77712 115.938 11.0486C117.051 12.2974 117.607 13.8981 117.607 15.8508V26H111.817V16.6341C111.817 15.794 111.59 15.1583 111.136 14.7269C110.682 14.2955 110.08 14.0798 109.331 14.0798C108.219 14.0798 107.288 14.5566 106.538 15.5102V26H100.749V2.15951ZM122.709 24.2631C120.961 22.7418 120.087 20.5962 120.087 17.8261C120.087 15.0561 120.961 12.9218 122.709 11.4232C124.48 9.90199 126.671 9.14137 129.282 9.14137C131.893 9.14137 134.073 9.90199 135.821 11.4232C137.592 12.9218 138.478 15.0561 138.478 17.8261C138.478 20.5962 137.592 22.7418 135.821 24.2631C134.073 25.7616 131.893 26.5109 129.282 26.5109C126.671 26.5109 124.48 25.7616 122.709 24.2631ZM131.734 20.3805C132.257 19.6993 132.518 18.8479 132.518 17.8261C132.518 16.8044 132.257 15.9529 131.734 15.2718C131.212 14.5906 130.395 14.25 129.282 14.25C128.17 14.25 127.352 14.5906 126.83 15.2718C126.308 15.9529 126.047 16.8044 126.047 17.8261C126.047 18.8479 126.308 19.6993 126.83 20.3805C127.352 21.0616 128.17 21.4022 129.282 21.4022C130.395 21.4022 131.212 21.0616 131.734 20.3805ZM146.234 11.866C146.689 11.094 147.381 10.4469 148.312 9.9247C149.266 9.40248 150.424 9.14137 151.786 9.14137C153.103 9.14137 154.283 9.39113 155.328 9.89064C156.372 10.3902 157.201 11.06 157.814 11.9001C158.427 12.7401 158.893 13.6711 159.21 14.6928C159.528 15.6918 159.687 16.7363 159.687 17.8261C159.687 18.916 159.528 19.9718 159.21 20.9935C158.893 21.9925 158.427 22.9121 157.814 23.7522C157.201 24.5923 156.372 25.2621 155.328 25.7616C154.283 26.2611 153.103 26.5109 151.786 26.5109C149.72 26.5109 148.096 25.8978 146.916 24.6717V33.4927H141.126V9.65224H146.234V11.866ZM152.808 20.5848C153.421 19.8128 153.727 18.8933 153.727 17.8261C153.727 16.759 153.421 15.8394 152.808 15.0674C152.217 14.2955 151.354 13.9095 150.219 13.9095C149.47 13.9095 148.8 14.1138 148.21 14.5225C147.619 14.9085 147.188 15.3853 146.916 15.9529V19.6993C147.188 20.2669 147.619 20.7551 148.21 21.1638C148.8 21.5498 149.47 21.7428 150.219 21.7428C151.354 21.7428 152.217 21.3568 152.808 20.5848Z"
              fill="url(#paint0_linear_9_7)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_9_7"
                x1="138.504"
                y1="-2.00001"
                x2="40.215"
                y2="60.8784"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF6432" />
                <stop offset="1" stop-color="#FFA228" />
              </linearGradient>
            </defs>
          </svg>
        </NuxtLink>
        <nav class="sitenav">
          <ul>
            <li><a href="/" @click.prevent="scrollTo('home')">Home</a></li>
            <li><a href="/" @click.prevent="scrollTo('menu')">Menu</a></li>
            <li><a href="/" @click.prevent="scrollTo('events')">Events</a></li>
            <li><a href="/" @click.prevent="scrollTo('about')">About us</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <button
            @click="store.isAuthenticated ? store.logout() : goToSignIn()"
            class="auth-btn"
          >
            {{ store.isAuthenticated ? "Logout" : "Sign In" }}
          </button>

          <!-- BTNS -->
          <button class="cart-btn" @click="cartBoardToggle()">
            <svg
              version="1.0"
              width="28"
              height="26.67"
              viewBox="0 0 512.000000 512.000000"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path
                  d="M2393 4945 c-201 -36 -383 -134 -524 -283 -178 -185 -269 -417 -269 -683 l0 -99 -198 0 c-217 0 -276 -9 -366 -58 -104 -55 -201 -178 -235 -297 -12 -40 -141 -2667 -141 -2860 0 -55 6 -123 14 -151 44 -167 193 -307 364 -343 75 -16 2969 -16 3044 0 172 36 319 174 364 343 8 28 14 96 14 151 0 193 -129 2820 -141 2860 -34 119 -131 242 -235 297 -90 49 -150 58 -365 58 l-196 0 -6 138 c-8 208 -54 356 -162 517 -206 310 -596 476 -962 410z m302 -320 c181 -38 349 -168 433 -335 51 -102 72 -193 72 -317 l0 -93 -640 0 -640 0 0 93 c1 197 61 349 189 478 156 155 370 219 586 174z m1208 -1069 c46 -17 74 -40 94 -80 12 -24 28 -287 80 -1380 35 -743 62 -1389 61 -1436 -3 -99 -19 -128 -84 -160 -40 -20 -57 -20 -1494 -20 -1437 0 -1454 0 -1494 20 -66 33 -81 61 -84 165 -1 50 26 693 61 1431 71 1481 63 1391 136 1436 l36 23 1040 5 c572 3 1168 6 1325 7 219 2 294 -1 323 -11z"
                />
                <path
                  d="M1692 3200 c-78 -48 -90 -124 -42 -272 48 -149 109 -247 230 -369 141 -142 262 -212 455 -264 95 -25 293 -31 398 -11 309 59 558 245 696 522 50 100 85 224 78 280 -9 80 -72 134 -157 134 -83 0 -138 -46 -160 -135 -45 -178 -163 -336 -313 -419 -197 -109 -441 -108 -635 4 -75 44 -181 148 -225 221 -21 35 -51 107 -68 160 -30 96 -53 131 -106 158 -35 18 -114 13 -151 -9z"
                />
              </g>
            </svg>
          </button>
          <button class="burger-btn" @click="burgerMenuToggle()">
            <svg
              width="28"
              height="19"
              viewBox="0 0 28 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.16515"
                y1="1.09913"
                x2="27.0826"
                y2="1.09913"
                stroke="url(#paint0_linear_202_31)"
                stroke-width="1.80174"
                stroke-linecap="round"
              />
              <line
                x1="1.16515"
                y1="9.4148"
                x2="27.0826"
                y2="9.4148"
                stroke="url(#paint1_linear_202_31)"
                stroke-width="1.80174"
                stroke-linecap="round"
              />
              <line
                x1="1.16515"
                y1="17.7305"
                x2="27.0826"
                y2="17.7305"
                stroke="url(#paint2_linear_202_31)"
                stroke-width="1.80174"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_202_31"
                  x1="24.1343"
                  y1="2"
                  x2="22.7724"
                  y2="7.51564"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF612E" />
                  <stop offset="1" stop-color="#FFA32B" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_202_31"
                  x1="24.1343"
                  y1="10.3157"
                  x2="22.7724"
                  y2="15.8313"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF612E" />
                  <stop offset="1" stop-color="#FFA32B" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_202_31"
                  x1="24.1343"
                  y1="18.6314"
                  x2="22.7724"
                  y2="24.1471"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF612E" />
                  <stop offset="1" stop-color="#FFA32B" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
        <Transition name="burgerMenuTrs">
          <div class="header__menu" v-show="burgerMenu">
            <button class="close-menu" @click="burgerMenuToggle()">
              <svg
                width="20"
                height="20"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#a3a3a3"
                  d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
                />
              </svg>
            </button>
            <ul>
              <li><a href="#" @click.prevent="scrollTo('home')">Home</a></li>
              <li><a href="#" @click.prevent="scrollTo('menu')">Menu</a></li>
              <li>
                <a href="#" @click.prevent="scrollTo('events')">Events</a>
              </li>
              <li>
                <a href="#" @click.prevent="scrollTo('about')">About us</a>
              </li>
              <li>
                <button
                  @click="store.isAuthenticated ? store.logout() : goToSignIn()"
                  class="auth-btn"
                >
                  {{ store.isAuthenticated ? "Log Out" : "Sign In" }}
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </header>

    <!-- MAIN -->
    <main class="main">
      <NuxtPage />
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="footer__main">
          <a href="/" class="footer__logo">
            <svg
              width="160"
              height="34"
              viewBox="0 0 160 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.84563 11.866C6.29973 11.094 6.99224 10.4469 7.92315 9.9247C8.87677 9.40248 10.0347 9.14137 11.3971 9.14137C12.714 9.14137 13.8946 9.39113 14.9391 9.89064C15.9835 10.3902 16.8122 11.06 17.4253 11.9001C18.0383 12.7401 18.5038 13.6711 18.8217 14.6928C19.1395 15.6918 19.2985 16.7363 19.2985 17.8261C19.2985 18.916 19.1395 19.9718 18.8217 20.9935C18.5038 21.9925 18.0383 22.9121 17.4253 23.7522C16.8122 24.5923 15.9835 25.2621 14.9391 25.7616C13.8946 26.2611 12.714 26.5109 11.3971 26.5109C9.33088 26.5109 7.70745 25.8978 6.52678 24.6717V33.4927H0.73695V9.65224H5.84563V11.866ZM12.4188 20.5848C13.0318 19.8128 13.3384 18.8933 13.3384 17.8261C13.3384 16.759 13.0318 15.8394 12.4188 15.0674C11.8285 14.2955 10.9657 13.9095 9.83039 13.9095C9.08112 13.9095 8.41132 14.1138 7.82098 14.5225C7.23064 14.9085 6.79925 15.3853 6.52678 15.9529V19.6993C6.79925 20.2669 7.23064 20.7551 7.82098 21.1638C8.41132 21.5498 9.08112 21.7428 9.83039 21.7428C10.9657 21.7428 11.8285 21.3568 12.4188 20.5848ZM27.8137 26H22.0239V9.65224H27.8137V26ZM28.2224 4.13487C28.2224 5.20201 27.9046 6.00805 27.2688 6.55297C26.6558 7.07519 25.8724 7.3363 24.9188 7.3363C23.9652 7.3363 23.1705 7.07519 22.5348 6.55297C21.9217 6.00805 21.6152 5.20201 21.6152 4.13487C21.6152 3.09043 21.9331 2.3071 22.5688 1.78488C23.2046 1.23995 23.9879 0.967488 24.9188 0.967488C25.8724 0.967488 26.6558 1.23995 27.2688 1.78488C27.9046 2.3071 28.2224 3.09043 28.2224 4.13487ZM31.0633 9.65224H44.8568V13.058L38.2495 21.2319H45.3336V26H30.5865V22.5942L37.2278 14.4203H31.0633V9.65224ZM47.8262 9.65224H61.6196V13.058L55.0124 21.2319H62.0964V26H47.3494V22.5942L53.9906 14.4203H47.8262V9.65224ZM80.3237 21.3341C80.3237 22.0152 80.6984 22.3558 81.4476 22.3558C81.6747 22.3558 81.8904 22.3218 82.0947 22.2536V25.8297C81.2319 26.1703 80.2556 26.3406 79.1658 26.3406C77.3494 26.3406 76.0552 25.7389 75.2832 24.5355C73.603 25.8524 71.7071 26.5109 69.5955 26.5109C67.9834 26.5109 66.6325 26.0568 65.5426 25.1486C64.4528 24.2403 63.9079 23.0143 63.9079 21.4703C63.9079 20.494 64.1236 19.6425 64.555 18.916C64.9864 18.1667 65.554 17.5991 66.2578 17.2131C66.9844 16.8271 67.7337 16.5433 68.5057 16.3616C69.3003 16.18 70.1291 16.0892 70.9919 16.0892C72.218 16.0892 73.3986 16.214 74.5339 16.4638V15.8848C74.5339 15.2718 74.2387 14.7836 73.6484 14.4203C73.0808 14.0343 72.2407 13.8414 71.1281 13.8414C69.4025 13.8414 67.4953 14.2614 65.4064 15.1015V10.2312C67.6315 9.50465 69.7545 9.14137 71.7752 9.14137C74.568 9.14137 76.6909 9.72035 78.144 10.8783C79.5972 12.0363 80.3237 14.0003 80.3237 16.7703V21.3341ZM69.868 20.9935C69.868 21.4476 70.0496 21.8336 70.4129 22.1515C70.7762 22.4466 71.253 22.5942 71.8433 22.5942C72.8651 22.5942 73.7619 22.3104 74.5339 21.7428V19.529C73.9209 19.3247 73.2284 19.2225 72.4564 19.2225C70.7308 19.2225 69.868 19.8128 69.868 20.9935ZM83.6063 14.3522C83.6063 12.5131 84.2761 11.1848 85.6157 10.3675C86.9553 9.55006 88.6582 9.14137 90.7244 9.14137C92.8587 9.14137 94.9135 9.60683 96.8889 10.5377V15.1355C96.1623 14.636 95.2541 14.2273 94.1643 13.9095C93.0971 13.5689 92.0867 13.3986 91.1331 13.3986C90.0887 13.3986 89.5664 13.6711 89.5664 14.216C89.5664 14.6247 89.8616 14.9653 90.4519 15.2377C91.0423 15.4875 91.7575 15.7259 92.5976 15.9529C93.4377 16.18 94.2778 16.4638 95.1179 16.8044C95.958 17.1223 96.6732 17.6558 97.2635 18.4051C97.8539 19.1544 98.149 20.0966 98.149 21.2319C98.149 24.7512 95.5493 26.5109 90.3498 26.5109C87.716 26.5109 85.5249 26.0114 83.7766 25.0123V20.4145C85.5249 21.5725 87.6138 22.1515 90.0433 22.1515C91.4737 22.1515 92.1889 21.879 92.1889 21.3341C92.1889 20.9481 91.8937 20.6302 91.3034 20.3805C90.7131 20.108 89.9978 19.8582 89.1578 19.6312C88.3177 19.4041 87.4776 19.1203 86.6375 18.7797C85.7974 18.4165 85.0822 17.8602 84.4918 17.1109C83.9015 16.3616 83.6063 15.4421 83.6063 14.3522ZM100.749 2.15951H106.538V10.8783C107.833 9.72035 109.343 9.14137 111.068 9.14137C113.202 9.14137 114.826 9.77712 115.938 11.0486C117.051 12.2974 117.607 13.8981 117.607 15.8508V26H111.817V16.6341C111.817 15.794 111.59 15.1583 111.136 14.7269C110.682 14.2955 110.08 14.0798 109.331 14.0798C108.219 14.0798 107.288 14.5566 106.538 15.5102V26H100.749V2.15951ZM122.709 24.2631C120.961 22.7418 120.087 20.5962 120.087 17.8261C120.087 15.0561 120.961 12.9218 122.709 11.4232C124.48 9.90199 126.671 9.14137 129.282 9.14137C131.893 9.14137 134.073 9.90199 135.821 11.4232C137.592 12.9218 138.478 15.0561 138.478 17.8261C138.478 20.5962 137.592 22.7418 135.821 24.2631C134.073 25.7616 131.893 26.5109 129.282 26.5109C126.671 26.5109 124.48 25.7616 122.709 24.2631ZM131.734 20.3805C132.257 19.6993 132.518 18.8479 132.518 17.8261C132.518 16.8044 132.257 15.9529 131.734 15.2718C131.212 14.5906 130.395 14.25 129.282 14.25C128.17 14.25 127.352 14.5906 126.83 15.2718C126.308 15.9529 126.047 16.8044 126.047 17.8261C126.047 18.8479 126.308 19.6993 126.83 20.3805C127.352 21.0616 128.17 21.4022 129.282 21.4022C130.395 21.4022 131.212 21.0616 131.734 20.3805ZM146.234 11.866C146.689 11.094 147.381 10.4469 148.312 9.9247C149.266 9.40248 150.424 9.14137 151.786 9.14137C153.103 9.14137 154.283 9.39113 155.328 9.89064C156.372 10.3902 157.201 11.06 157.814 11.9001C158.427 12.7401 158.893 13.6711 159.21 14.6928C159.528 15.6918 159.687 16.7363 159.687 17.8261C159.687 18.916 159.528 19.9718 159.21 20.9935C158.893 21.9925 158.427 22.9121 157.814 23.7522C157.201 24.5923 156.372 25.2621 155.328 25.7616C154.283 26.2611 153.103 26.5109 151.786 26.5109C149.72 26.5109 148.096 25.8978 146.916 24.6717V33.4927H141.126V9.65224H146.234V11.866ZM152.808 20.5848C153.421 19.8128 153.727 18.8933 153.727 17.8261C153.727 16.759 153.421 15.8394 152.808 15.0674C152.217 14.2955 151.354 13.9095 150.219 13.9095C149.47 13.9095 148.8 14.1138 148.21 14.5225C147.619 14.9085 147.188 15.3853 146.916 15.9529V19.6993C147.188 20.2669 147.619 20.7551 148.21 21.1638C148.8 21.5498 149.47 21.7428 150.219 21.7428C151.354 21.7428 152.217 21.3568 152.808 20.5848Z"
                fill="url(#paint0_linear_9_7)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9_7"
                  x1="138.504"
                  y1="-2.00001"
                  x2="40.215"
                  y2="60.8784"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF6432" />
                  <stop offset="1" stop-color="#FFA228" />
                </linearGradient>
              </defs>
            </svg>
          </a>
          <div class="footer__list-wr">
            <ul class="list">
              <li class="list-title">Home</li>
              <li><NuxtLink to="/orderPage">To Order</NuxtLink></li>
              <li>
                <a href="#" @click.prevent="scrollTo('about')">About us</a>
              </li>
              <li>
                <a href="#" @click.prevent="scrollTo('events')">Events</a>
              </li>
              <li><a href="#" @click.prevent="scrollTo('menu')">Menu</a></li>
            </ul>

            <ul class="list">
              <li class="list-title">Events</li>
              <li>
                <NuxtLink
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                  >3 Pizza 1 Free Coffee</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                  >2 Pizza for 1 Price</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                  >Kitchen Tour</NuxtLink
                >
              </li>
            </ul>

            <ul class="list">
              <li class="list-title">Menu</li>
              <li>
                <a href="#" @click.prevent="scrollTo('menu')">Show All</a>
              </li>
              <li>
                <a href="#" @click.prevent="scrollTo('menu')">Seaproducts</a>
              </li>
              <li><a href="#" @click.prevent="scrollTo('menu')">Vegan</a></li>
              <li><a href="#" @click.prevent="scrollTo('menu')">Meat</a></li>
            </ul>

            <ul class="list">
              <li class="list-title">About us</li>
              <li><NuxtLink to="/">Our History</NuxtLink></li>
              <li><NuxtLink to="/">Why We?</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__number">
            <span>+</span>7 <span>(</span>937<span>)</span> 333-55-33
          </p>
          <ul class="footer__social-media">
            <li>
              <NuxtLink>
                <img
                  src="../assets/images/png/social_media/instagram.png"
                  alt="ins"
                />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink>
                <img
                  src="../assets/images/png/social_media/twitter.png"
                  alt="twi"
                />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink>
                <img
                  src="../assets/images/png/social_media/facebook.png"
                  alt="twi"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Cart_item from "~/assets/components/Cart_item.vue";

import { useStore } from "~/stores/store";
import { useRouter } from "vue-router";

let burgerMenu = ref(false);
let cartBoard = ref(false);

const store = useStore();
const router = useRouter();

function goToSignIn() {
  router.push("/signInPage");
}

function burgerMenuToggle() {
  burgerMenu.value = !burgerMenu.value;
}

function cartBoardToggle() {
  cartBoard.value = !cartBoard.value;
}

function closeAllModals() {
  burgerMenu.value = false;
  cartBoard.value = false;
}

const scrollTo = async (id) => {
  if (!process.client) return;

  if (window.location.pathname !== "/") {
    await router.push({ path: "/", query: { scrollTo: id } });
    return;
  }

  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  closeAllModals();
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins";

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.header__menu {
  position: fixed;
  top: 0;
  right: 0;
  padding: 24px;

  width: 100%;
  height: 100%;
  max-width: 400px;
  background-color: #fff;
  z-index: 100;

  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;

    li a,
    button {
      font-weight: 400;
      font-size: 20px;
      line-height: 1.1;
      color: var(--text-color);

      transition: all 0.1s ease;
      cursor: pointer;

      &:hover {
        background: var(--main-gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  .close-menu {
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.1s ease;

    position: absolute;
    top: 20px;
    right: 20px;

    &:hover {
      svg path {
        transition: all 0.1s ease;
        fill: #ffa228;
      }
    }

    &:active {
      opacity: 0.8;
    }
  }
}

.cartBoard {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;

  position: fixed;
  top: 0;
  right: 0;
  padding: 24px;

  width: 100%;
  height: 100%;

  max-width: 400px;
  background-color: #fff;
  z-index: 100;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;

    &__title {
      font-weight: 550;
      font-size: clamp(20px, 2vw, 22px);
      line-height: 1.1;
      color: black;
    }

    &__close-menu {
      border: none;
      background: none;
      cursor: pointer;
      transition: all 0.1s ease;

      svg {
        display: flex;
      }

      &:hover {
        svg path {
          transition: all 0.1s ease;
          fill: #ffa228;
        }
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  &__card-wr {
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__footer {
    padding-top: 24px;

    display: flex;
    flex-direction: column;
    align-items: start;

    .total {
      width: 100%;
      display: flex;
      align-items: start;
      justify-content: space-between;
      margin-bottom: 24px;

      font-weight: 500;
      line-height: 1.4;

      &__text-wr {
        display: flex;
        flex-direction: column;
        align-items: start;
      }

      &__title {
        font-size: clamp(14px, 2vw, 16px);
        color: black;
      }

      &__desc {
        font-size: clamp(14px, 2vw, 12px);
        color: #6b7280;
      }

      &__price {
        font-size: clamp(14px, 2vw, 16px);
        color: black;

        span {
          font-family: sans-serif;
        }
      }
    }

    &__orderBtn {
      width: 100%;
      padding: 12px 24px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 6px;
      background: var(--main-gradient);

      font-weight: 500;
      font-size: clamp(14px, 2vw, 16px);
      line-height: 1.4;
      color: white;

      transition: all 0.1s ease;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
}

.burgerMenuTrs-enter-from,
.burgerMenuTrs-leave-to,
.cartBoardTrs-enter-from,
.cartBoardTrs-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.burgerMenuTrs-enter-to,
.burgerMenuTrs-leave-from,
.cartBoardTrs-enter-to,
.cartBoardTrs-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.burgerMenuTrs-enter-active,
.burgerMenuTrs-leave-active,
.cartBoardTrs-enter-active,
.cartBoardTrs-leave-active {
  transition: all 0.4s ease;
}
</style>
