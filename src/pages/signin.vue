<script setup>
import { ref } from "vue";
import useAuthStore from "../stores/authStore";

const authStore = useAuthStore();

const credentials = ref({
  email: null,
  password: null,
});

const signin = async () => {
  const { data, errors } = await authStore.signin(
    credentials.value.email,
    credentials.value.password
  );

  console.log(data, errors);
};
</script>

<template>
  <section id="page-signin">
    <form @submit.prevent="signin" id="form-signin">
      <h1 class="text-2xl font-bold text-center">Log på</h1>
      <div class="input">
        <label for="email">E-mail:</label>
        <input
          v-model="credentials.email"
          type="email"
          placeholder="Indtast e-mail"
          required
        />
      </div>
      <div class="input">
        <label for="password">Password:</label>
        <input
          v-model="credentials.password"
          type="password"
          placeholder="Indtast password"
          required
        />
      </div>
      <button class="btn w-full">Log på</button>
    </form>
  </section>
</template>

<style>
#page-signin {
  @apply h-screen grid place-items-center;
}

#form-signin {
  @apply border-2 border-slate-100 rounded p-4 w-full max-w-md space-y-4;
}
</style>
