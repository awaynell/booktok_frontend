<template>
  <div class="max-md:block md:hidden">
    <!-- Backdrop -->
    <div
      v-show="store.isOpen"
      @click="store.setSidebarIsOpen(false)"
      :class="
        cn('fixed inset-0 z-40 bg-black/50 transition-opacity duration-300', {
          'opacity-0 pointer-events-none': !store.isOpen,
          'opacity-100': store.isOpen,
        })
      "
    />

    <!-- Sidebar -->
    <div
      ref="sidebarRef"
      id="mobile_sidebar"
      :class="
        cn(
          'fixed inset-x-0 bottom-0 z-50',
          'h-3/4 dark:bg-slate-900',
          'bg-stone-300 rounded-t-xl p-4',
          'transform transition-transform',
          'duration-300 ease-in-out ml-2 mr-2',
          {
            'translate-y-1/6': store.isOpen,
            'translate-y-full': !store.isOpen,
          },
        )
      "
    >
      <span
        class="absolute right-4 top-4 text-5xl text-slate-800 dark:text-stone-300 cursor-pointer"
        @click="store.setSidebarIsOpen(false)"
      >
        &times;
      </span>

      <h1 class="text-5xl mb-4 text-slate-800 dark:text-stone-300">Reviews</h1>
      <div class="overflow-y-auto h-[calc(100%-80px)]">
        <div
          v-for="(review, index) in store.reviews"
          :key="index"
          class="mt-2 border border-slate-500 rounded-2xl p-4"
        >
          <div class="flex justify-between mb-2">
            <div class="text-primary text-sm">
              {{ review.user_id }}
            </div>
            <div class="text-primary text-xs">
              {{ new Date(review.created_at).toLocaleDateString() }}
            </div>
          </div>
          <p class="text-primary text-sm">{{ review.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';

import { onMounted, ref } from 'vue';

import { useSidebarStore } from '~/stores/sidebarStore';
import { cn } from '~/theme';

const store = useSidebarStore();
const isMounted = ref(false);
const sidebarRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // Если sidebarRef привязан к элементу через ref="sidebarRef" в шаблоне,
  // можно сразу его скрыть за пределами экрана.
  gsap.set(sidebarRef.value, { y: window.innerHeight });
});

watch(
  () => store.isOpen,
  (isOpen) => {
    if (isOpen) {
      const element = document.querySelector('#mobile_sidebar');
      closeOnDrag(element);
      gsap.to(sidebarRef.value, { y: 0, duration: 0.15, ease: 'power2.out' });
    } else {
      // Анимация скрытия
      gsap.to(sidebarRef.value, {
        y: window.innerHeight,
        duration: 0.15,
        ease: 'power2.in',
      });
    }
  },
);

const closeOnDrag = (element: HTMLElement) => {
  gsap.registerPlugin(Draggable);

  Draggable.create(element, {
    type: 'y',
    bounds: {
      minY: 100,
      maxY: window.innerHeight * 0.8,
    },
    edgeResistance: 0.8,
    onDragEnd: (e) => {
      if (e.y > window.innerHeight * 0.4) {
        store.setSidebarIsOpen(false);
      }
    },
  });
};
</script>
