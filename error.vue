<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div
    style="height: 100vh"
    class="main_container flex items-center justify-center"
  >
    <div
      class="flex flex-col bg-slate-500 rounded-xl w-full items-center justify-center gap-10"
    >
      <h1 class="text-white text-5xl">{{ error.statusCode }}</h1>
      <button class="border border-amber-400 rounded p-2 hover:bg-amber-400">
        <NuxtLink to="/">Go back home</NuxtLink>
      </button>
    </div>
  </div>
</template>
