<template>
  <div
    class="relative w-screen h-screen flex transition-all duration-300 ease-in-out bg-bg text-white"
  >
    <!-- Левая панель -->
    <div
      class="p-5 h-full overflow-auto flex-shrink-0 w-1/4 border-r border-secondary bg-bg"
    >
      <div class="sticky top-0 z-100 bg-bg">
        <h1 class="text-5xl mb-0 z-50 text-primary font-bold">БукТок</h1>
        <h1 v-if="!isLoading" class="text-base mt-4 mb-0 text-primary">
          {{ `${activeIndex + 1} / ${allBooks.length}` }}
        </h1>
      </div>
      <div class="flex flex-col gap-5 mt-12">
        <div
          v-for="(ad, index) in 2"
          :key="index"
          class="w-[300px] h-[275px] rounded-lg bg-secondary text-primary flex items-center justify-center text-center"
        >
          Тут могла быть ваша реклама
        </div>
      </div>
    </div>

    <!-- Слайдер -->
    <TokSlider
      :books="allBooks"
      :fetch-next-page="fetchNextPage"
      :is-loading="isLoading"
      @slide-change="handleSlideChange"
    />

    <!-- Правая панель -->
    <div
      class="p-5 h-full overflow-auto flex-shrink-0 w-1/4 border-l border-secondary bg-bg"
    >
      <h1 class="text-5xl mb-0 text-primary">
        {{ allBooks[activeIndex]?.title }}
      </h1>
      <div class="flex flex-col gap-5 mt-12">
        <div
          class="w-[300px] h-[275px] rounded-lg bg-secondary text-primary flex items-center justify-center text-center"
        >
          {{ allBooks[activeIndex]?.author_name?.slice(0, 3).join(", ") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";

import { booksAPI } from "~/api/books";
import { all } from "axios";

const activeIndex = ref(0);

const { data, fetchNextPage, isLoading } = useInfiniteQuery({
  queryKey: ["books"],
  initialPageParam: 1,
  queryFn: ({ pageParam = 1 }) => booksAPI.getBooks({ page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});

const allBooks = computed(
  () => data.value?.pages.flatMap((page) => page.books) || []
);

console.log(allBooks.value);

const handleSlideChange = (index: number) => {
  activeIndex.value = index;
};
</script>

<!-- <style>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary rounded-xl;
  transition: all 0.3s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-secondary;
}
</style> -->
