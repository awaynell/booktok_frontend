<template>
  <div
    class="w-full h-screen p-6 transition-all duration-300 ease-in-out"
    id="container"
  >
    <div class="flex justify-center items-center h-full" v-if="isLoading">
      <Loader />
    </div>
    <swiper
      class="h-full max-w-[520px] min-w-[425px] rounded-xl p-6 transition-all duration-300 ease-in-out"
      :direction="'vertical'"
      :modules="modules"
      :slides-per-view="1"
      :space-between="25"
      :mousewheel="true"
      :keyboard="true"
      @swiper="setSwiper"
      @slide-change="handleSlideChange"
      v-else
    >
      <swiper-slide v-for="(book, i) in books" :key="book.cover_i || i">
        <Slide
          :book="book"
          :idx="i"
          :swiper-instance="swiperInstance"
          :active-index="activeIndex"
          :key="book.cover_i"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import type { Book } from "~/types/books.types";
import Loader from "~/components/Loader/index.vue";
import Slide from "./ui/Slide.vue";
import { createDraggable } from "./utils/createDraggable";

const props = defineProps({
  books: {
    type: Array as () => Book[],
    required: true,
  },
  fetchNextPage: {
    type: Function,
    required: true,
  },
  onSlideChange: {
    type: Function,
    default: undefined,
  },
});

const modules = [Keyboard, Mousewheel];

const swiperInstance = ref<SwiperClass>({} as SwiperClass);
const activeIndex = ref(0);

const setSwiper = (swiper: SwiperClass) => {
  swiperInstance.value = swiper;
};

const handleSlideChange = (swiper: SwiperClass) => {
  activeIndex.value = swiper.activeIndex;
  createDraggable(swiper.activeIndex, swiper);

  props.onSlideChange?.(swiper.activeIndex);
};

watch(activeIndex, (newVal) => {
  if (
    swiperInstance.value &&
    props.books.length > 0 &&
    newVal === props.books.length - 2
  ) {
    props.fetchNextPage();
  }
});

watch(props.books, (newVal) => {
  if (newVal.length > 0) {
    nextTick(() => {
      createDraggable(activeIndex.value, swiperInstance.value);
    });
  }
});
</script>
