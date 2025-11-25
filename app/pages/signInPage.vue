<template>
  <!-- LOGIN -->
  <div class="signIn">
    <div class="container">
      <div class="signIn-wr">
        <h2 class="signIn__title">
          {{ isLogin ? "Sign in to your account" : "Create your account" }}
        </h2>
        <form class="signIn__form" @submit.prevent="handleSubmit()">
          <label for="email">Email address</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            autocomplete="email"
          />

          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            :autocomplete="isLogin ? 'current-password' : 'new-password'"
          />

          <button class="signIn__btn">
            {{ isLogin ? "Sign In" : "Sign Up" }}
          </button>
        </form>

        <div class="signIn__actions">
          <p class="signIn__desc">
            <span>
              {{
                isLogin ? "Dont have an account? " : "Already have an account? "
              }}
            </span>
            <span class="link-text" @click="toggleMode">
              {{ isLogin ? "Sign up" : "Sign in" }}
            </span>
          </p>
          <NuxtLink to="/" class="signIn__back">Back to Home </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "~/stores/store";
import { useRouter } from "#imports";
import { useToast } from "vue-toastification/dist/index.mjs";

definePageMeta({
  layout: "empty",
});

const toast = useToast();

const store = useStore();
const router = useRouter();

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const users = ref([]);

onMounted(() => {
  const storedUsers = localStorage.getItem("users");
  users.value = storedUsers ? JSON.parse(storedUsers) : [];
});

function toggleMode() {
  isLogin.value = !isLogin.value;
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users.value));
}

function handleSubmit() {
  // Validate input
  if (!email.value || !password.value) {
    toast.warning("Please enter both email and password.", { timeout: 3000 });
    return;
  }

  const existingUser = users.value.find((u) => u.email === email.value);

  if (isLogin.value) {
    // --- Sign In ---
    if (existingUser && existingUser.password === password.value) {
      store.login(email.value);
      toast.success("You have successfully Signed In!", { timeout: 3000 });
      router.push("/");
    } else {
      toast.error("Incorrect email or password");
    }
  } else {
    // --- Sign Up ---
    if (!existingUser) {
      users.value.push({ email: email.value, password: password.value });
      saveUsers();

      store.login(email.value);
      toast.success("Your account has been created successfully!", {
        timeout: 3000,
      });
      router.push("/");
    } else {
      toast.error("This account already exists", { timeout: 3000 });
    }
  }

  // Reset fields
  email.value = "";
  password.value = "";
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins";

.signIn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  .container {
    width: 100%;
    max-width: 384px;
  }

  .signIn-wr {
    width: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 1.1;
    color: var(--title-color);

    font-family: "muller Extra Bold";
    text-align: center;
    margin: 0 auto;
    margin-bottom: 32px;

    @include media(380px) {
      font-size: 24px;
    }
  }

  &__form {
    width: 100%;
    max-width: 380px;

    display: flex;
    flex-direction: column;
    align-items: start;

    label {
      font-weight: 400;
      font-size: 18px;
      line-height: 1.1;
      color: var(--text-color);

      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 6px 12px;

      font-weight: 500;
      font-size: 18px;
      line-height: 1.1;
      color: var(--title-color);

      border-radius: 8px;
      border: 1px solid #b1ada9;
      outline: none;

      background-color: #240e00;
      margin-bottom: 20px;

      @include media(380px) {
        padding: 4px 8px;
        margin-bottom: 16px;
      }
    }

    #password {
      font-family: sans-serif;
    }
  }

  &__btn {
    @include pr-btn;
    width: 100%;
    border-radius: 8px;

    margin-top: 18px;
    margin-bottom: 14px;

    @include media(380px) {
      margin-top: 10px;
    }
  }

  &__actions {
    width: 100%;
    max-width: 380px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include media(380px) {
      flex-direction: column;
      align-items: start;
      gap: 2px;
    }
  }

  &__desc {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.1;
    color: var(--title-color);
  }

  &__back {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.1;
    color: var(--title-color);

    transition: all 0.1s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }

  .link-text {
    background: var(--main-gradient);
    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
    cursor: pointer;

    transition: all 0.1s ease;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }

  &__back {
    font-weight: 500;
    color: var(--text-color);
    font-size: 14px;
  }
}
</style>
