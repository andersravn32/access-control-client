<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li v-if="message.type == 'message-personal'" class="chat-message" :class="message.type">
    <p>{{ message.text }}</p>
    <div class="flex-shrink-0 h-10 w-10 bg-sky-400 text-white rounded-full grid place-items-center font-bold text-2xl">{{ message.displayname[0] }}</div>
  </li>

  <li v-if="message.type == 'message-foreign'" class="chat-message" :class="message.type">
    <div class="flex-shrink-0 h-10 w-10 bg-sky-400 text-white rounded-full grid place-items-center font-bold text-2xl">{{ message.displayname[0] }}</div>
    <p>{{ message.text }}</p>
  </li>

  <li v-if="message.type == 'message-announcement'" class="chat-message" :class="message.type">
    <span class="text-xs text-black/50">{{ message.text }}</span>
  </li>
</template>

<style>
.chat-message {
    @apply flex items-center space-x-4 p-4 rounded odd:bg-zinc-100;
}

.message-personal {
    @apply justify-end;
}

.message-foreign {
    @apply justify-start;
}

.message-announcement { 
    @apply justify-center italic;
}
</style>