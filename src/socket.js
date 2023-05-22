import { ref } from "vue";
import { io } from "socket.io-client";

export const socket = io("http://127.0.0.1:4000", {
  auth: {
    token: localStorage.getItem("accessToken"),
  },
});