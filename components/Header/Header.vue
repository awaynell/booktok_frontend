<template>
  <header
    :class="
      cn(
        'flex justify-between items-center pl-5 pr-5 pt-4 pb-4 mt-4 rounded-xl w-full',
        'bg-white dark:bg-gray-800',
      )
    "
  >
    <NuxtLink to="/">
      <h1
        class="text-5xl mb-0 z-50 text-primary font-bold dark:text-slate-200 text-stone-800"
      >
        Буклет
      </h1>
    </NuxtLink>

    <nav class="flex gap-10 items-center dark:text-slate-100 text-stone-800">
      <NuxtLink to="/profile" class="cursor-pointer">Профиль</NuxtLink>
    </nav>
    <ThemeToggle />
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from '~/components/atoms/ThemeToggle/ThemeToggle.vue';

import { cn } from '~/theme';
</script>
