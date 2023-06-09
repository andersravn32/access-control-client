import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/signin",
      component: () => import("../pages/signin.vue"),
    },
    {
      path: "/signup",
      component: () => import("../pages/signup.vue"),
    },
    {
      path: "/chat",
      component: () => import("../pages/chat.vue"),
    },
  ],
});

export default router;
