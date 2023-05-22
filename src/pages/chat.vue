<script setup>
import Chat from "../components/Chat.vue";
import useAuthStore from "../stores/AuthStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
</script>

<template>
  <section id="page-chat">
    <Chat v-if="storeToRefs(authStore).user.value" />
  </section>
</template>

<style>
#page-chat {
    @apply h-screen grid place-items-center;
}
</style>