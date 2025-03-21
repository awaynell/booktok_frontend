<template>
  <span
    id="greenLight"
    class="absolute top-0 left-0 w-2/4 h-[250px] bg-green-500 opacity-1 blur-3xl transition-all duration-300 ease-in-out"
  ></span>
  <span
    id="redLight"
    class="absolute top-0 right-0 w-2/4 h-[250px] bg-red-500 opacity-1 blur-3xl transition-all duration-300 ease-in-out"
  ></span>
  <swiper
    class="rounded-xl transition-all duration-300 ease-in-out h-full w-full"
    direction="vertical"
    :modules="modules"
    :slides-per-view="1"
    :space-between="25"
    :mousewheel="true"
    :keyboard="true"
    @swiper="setSwiper"
    @slide-change="handleSlideChange"
    id="container"
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
import Slide from "./ui/Slide.vue";
import { createDraggable } from "./utils/createDraggable";
import CommentIcon from "~/components/Icons/CommentIcon.vue";

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
