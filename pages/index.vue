<template>
  <div
    :class="
      cn(
        'relative h-screen flex transition-all duration-300 ease-in-out',
        'text-white items-center gap-10  max-w-[1440px] m-auto',
        'max-md:w-full'
      )
    "
  >
    <!-- Левая панель -->
    <div
      class="rounded-xl p-5 h-11/12 overflow-hidden w-3/12 bg-green-900 max-sm:hidden transition-all duration-300 ease-in-out"
    >
      <div class="bg-bg">
        <h1 class="text-5xl mb-0 z-50 text-primary font-bold">БукТок</h1>
        <h1
          v-if="status === 'success' || status === 'pending'"
          class="text-base mt-4 mb-0 text-primary"
        >
          {{ `${activeIndex + 1} / ${allBooks.length}` }}
        </h1>
      </div>
      <div class="flex flex-col gap-5 mt-12">
        <div
          class="w-[300px] h-[275px] rounded-lg bg-secondary text-primary flex items-center justify-center text-center"
        >
          Тут могла быть ваша реклама
        </div>
      </div>
    </div>

    <!-- Слайдер -->
    <div
      :class="
        cn(
          'flex w-5/12 h-11/12 transition-all duration-300 ease-in-out',
          'max-md:w-full max-md:mr-2 max-md:ml-2'
        )
      "
    >
      <TokSlider
        :books="allBooks"
        :fetch-next-page="fetchNextPage"
        @slide-change="handleSlideChange"
      />
    </div>
    <DesktopSidebar :reviews="[]" />
  </div>
  <MobileSidebar :reviews="[]" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { booksAPI } from "~/api/books";
import { cn } from "~/theme";
import { type Book } from "~/types/books.types";
import DesktopSidebar from "~/components/Sidebar/DesktopSidebar.vue";
import MobileSidebar from "~/components/Sidebar/MobileSidebar.vue";

const activeIndex = ref(0);

const allBooks = reactive<Book[]>([]);
const page = ref(1);
const limit = 15;

const { status } = await booksAPI.getBooks(page, limit, allBooks);

async function fetchNextPage() {
  page.value += 1;
}

const handleSlideChange = (index: number) => {
  activeIndex.value = index;
};
</script>
