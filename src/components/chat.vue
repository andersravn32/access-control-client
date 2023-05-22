<script setup>
import { socket } from '../socket';
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
    socket.emit("chat-join");
})

onUnmounted(() => {
    socket.emit("chat-leave");
})
</script>

<template>
  <div class="chat">

  </div>
</template>
