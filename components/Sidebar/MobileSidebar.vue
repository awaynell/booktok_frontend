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
      v-show="store.isOpen || isMounted"
      :class="
        cn(
          'fixed inset-x-0 bottom-0 z-50',
          'h-2/4 bg-emerald-900 rounded-t-xl p-4',
          'transform transition-transform duration-300 ease-in-out ml-2 mr-2',
          {
            'translate-y-1/6': store.isOpen,
            'translate-y-full': !store.isOpen,
          }
        )
      "
    >
      <span
        class="absolute right-4 top-4 text-5xl text-white cursor-pointer"
        @click="store.setSidebarIsOpen(false)"
      >
        &times;
      </span>

      <h1 class="text-5xl mb-4 text-white">Reviews</h1>
      <div class="overflow-y-auto h-[calc(100%-80px)]">
        <div
          v-for="(review, index) in store.reviews"
          :key="index"
          class="mt-2 border border-amber-500 rounded-2xl p-4"
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
import { ref, onMounted } from "vue";
import { useSidebarStore } from "~/stores/sidebarStore";
import { cn } from "~/theme";

const store = useSidebarStore();
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>
