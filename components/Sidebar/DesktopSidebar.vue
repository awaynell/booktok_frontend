<template>
  <div
    :class="
      cn(
        {
          'translate-x-0 opacity-100 z-20': store.isOpen,
          'translate-x-full opacity-0 -z-20 absolute -left-[1408px]':
            !store.isOpen,
        },
        'w-5/12 dark:bg-slate-900 bg-stone-200 whitespace-break-spaces',
        'transition-all duration-300 ease-in-out',
        'rounded-2xl p-5 mr-5',
        'max-md:hidden',
      )
    "
  >
    <span
      class="text-5xl mb-0 text-slate-800 dark:text-stone-300 cursor-pointer absolute right-0 top-0"
      @click="store.setSidebarIsOpen(false)"
    >
      x
    </span>
    <div>
      <h1 class="text-5xl mb-0 text-slate-800 dark:text-stone-300">Reviews</h1>
      <div v-for="(review, index) in store.reviews" :key="index" class="mt-2">
        <div
          class="flex flex-col gap-2 border border-slate-500 rounded-2xl p-4"
        >
          <div class="flex justify-between">
            <div class="text-primary text-sm">
              {{ review.user_id }}
            </div>
            <div class="text-primary text-xs">
              {{ review.created_at }}
            </div>
          </div>
          {{ review.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from '~/stores/sidebarStore';
import { cn } from '~/theme';
import type { Review } from '~/types/review.types';

const store = useSidebarStore();

const props = defineProps({
  reviews: {
    type: Array as () => Review[],
    required: true,
  },
});
</script>

<style></style>
