// plugins/toast.client.js
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // Import the CSS

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    // Optional: Configure default options here
    hideProgressBar: true,
    // ... other options
  });
});