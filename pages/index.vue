<template>
  <div
    :class="
      cn(
        'relative transition-all duration-300 ease-in-out overflow-hidden',
        'text-slate-300 items-center max-md:pl-5 max-md:pr-5',
        'max-md:w-full',
        'main_container',
      )
    "
  >
    <div
      :class="
        cn(
          'mt-10 flex gap-10 justify-center w-full transition-all duration-300 ease-in-out',
          'max-md:w-full max-md:mr-2 max-md:ml-2',
        )
      "
    >
      <div class="w-5/12 max-md:w-full">
        <TokSlider
          :books="allBooks"
          :fetch-next-page="fetchNextPage"
          @slide-change="handleSlideChange"
        />
      </div>
      <DesktopSidebar :reviews="[]" />
    </div>
  </div>

  <MobileSidebar :reviews="[]" />
</template>

<script setup lang="ts">
import { ref } from "vue";

import { booksAPI } from "~/api/books";

import Footer from "~/components/Footer/Footer.vue";
import Header from "~/components/Header/Header.vue";
import DesktopSidebar from "~/components/Sidebar/DesktopSidebar.vue";
import MobileSidebar from "~/components/Sidebar/MobileSidebar.vue";

import { cn } from "~/theme";
import { type Book } from "~/types/books.types";

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
