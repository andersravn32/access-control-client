<template>
  <section id="page-index">
    <div class="border-2 border-slate-100 rounded p-4 w-full max-w-lg space-y-4">
      <h1 class="font-bold text-2xl text-center">Access-control demo app</h1>
      <div class="grid grid-cols-2 gap-4">
        <router-link class="btn" to="/signin">Log på</router-link>
        <router-link class="btn" to="/signup">Opret konto</router-link>
      </div>
    </div>
  </section>
</template>

<style>
#page-index {
  @apply h-screen grid place-items-center;
}
</style>
