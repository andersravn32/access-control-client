<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import useAuthStore from "./stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <router-view />
</template>
