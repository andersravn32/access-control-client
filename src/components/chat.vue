<script setup>
import { ref } from "vue";
import { socket } from "../socket";
import { storeToRefs } from "pinia";
import ChatMessage from "./ChatMessage.vue";
import useAuthStore from "../stores/AuthStore";

const authStore = useAuthStore();

const message = ref("");
const messages = ref([{
  type: "message-announcement",
  text: "Velkommen i chatten",
}]);

const sendMessage = () => {

  // If no message is present, return
  if (!message.value.length || !socket.connected) return;

  // Emit client signal to server
  socket.emit("chat-message", {
    text: message.value,
  })

  // Scroll to bottom of container
  document.getElementById("chat").scrollTop =
    document.getElementById("chat").scrollHeight;

  // Reset input value
  message.value = "";
};

// On server response, add message to stack
socket.on("chat-message", (e) => {
  messages.value.push(e)  
  // Scroll to bottom of container
  document.getElementById("chat").scrollTop =
    document.getElementById("chat").scrollHeight;
})
</script>

<template>
  <div class="chat">
    <h1 class="text-2xl font-bold">Chat</h1>
    <ul id="chat">
      <ChatMessage v-for="(message, index) in messages" :message="message" />
    </ul>

    <form id="form-chat" @submit.prevent="sendMessage">
      <input v-model="message" class="px-6 py-2 bg-slate-100 rounded w-full" type="text"
        placeholder="Indtast en besked" />
      <button class="btn">Send</button>
    </form>
  </div>
</template>

<style>
.chat {
  @apply w-full max-w-4xl border-2 border-slate-100 rounded p-4 flex flex-col space-y-4;
}

.chat ul {
  @apply flex flex-col max-h-96 overflow-scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.chat ul::-webkit-scrollbar {
  display: none;
}

#form-chat {
  @apply flex items-center space-x-4;
}
</style>
