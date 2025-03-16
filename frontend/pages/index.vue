<template>
  <div
    class="relative w-screen h-screen flex transition-all duration-300 ease-in-out bg-bg text-white"
  >
    <!-- Левая панель -->
    <div
      class="p-5 h-full overflow-auto flex-shrink-0 w-1/4 border-r border-secondary bg-bg max-sm:hidden"
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
      class="p-5 h-full overflow-auto flex-shrink-0 w-1/4 border-l border-secondary bg-bg max-sm:hidden"
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
import { booksAPI } from "~/api/books";
import { type Book } from "~/types/books.types";

const activeIndex = ref(0);

const allBooks = reactive<Book[]>([]);
const page = ref(1);
const limit = 5;

const { refresh, isLoading } = await booksAPI.getBooksV2(page, limit, allBooks);

async function fetchNextPage() {
  page.value += 1;
  await refresh();
}

onMounted(async () => {
  await booksAPI.getBooksV2(page, limit, allBooks);
});

const handleSlideChange = (index: number) => {
  activeIndex.value = index;
};
</script>
