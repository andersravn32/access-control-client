<script setup>
import { ref } from "vue";
import useAuthStore from "../stores/authStore";

const authStore = useAuthStore();

const credentials = ref({
  displayname: null,
  email: null,
  password: null,
});

const signup = async () => {
  const { data, errors } = await authStore.signup(
    credentials.value.email,
    credentials.value.password,
    credentials.value.displayname
  );

  console.log(data, errors);
};
</script>

<template>
  <section id="page-signup">
    <form @submit.prevent="signup" id="form-signup">
      <h1 class="text-2xl font-bold text-center">Opret konto</h1>
      <div class="input">
        <label for="displayname">Brugernavn:</label>
        <input v-model="credentials.displayname" type="text" placeholder="Indtast brugernavn" required />
      </div>
      <div class="input">
        <label for="email">E-mail:</label>
        <input v-model="credentials.email" type="email" placeholder="Indtast email" required />
      </div>
      <div class="input">
        <label for="password">Password:</label>
        <input v-model="credentials.password" type="password" placeholder="Indtast password" required />
      </div>
      <button class="btn w-full">Opret konto</button>
    </form>
  </section>
</template>

<style>
#page-signup {
  @apply h-screen grid place-items-center;
}

#form-signup {
  @apply border-2 border-slate-100 rounded p-4 w-full max-w-md space-y-4;
}
</style>
