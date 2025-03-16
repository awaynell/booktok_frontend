<template>
  <div
    class="w-full h-screen p-6 transition-all duration-300 ease-in-out"
    id="container"
  >
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
    >
      <swiper-slide v-if="isLoading">
        <div class="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      </swiper-slide>

      <template v-else>
        <swiper-slide
          v-for="(book, i) in books"
          :key="book.cover_i"
          class="p-3.5"
        >
          <div
            class="h-[95%] rounded-xl"
            v-if="book.cover_i || books.length === 0"
            :id="`book_slide_${i}`"
          >
            <NuxtImg
              class="w-full h-full rounded-xl object-contain transition-all duration-300 ease-in-out"
              :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
              :preload="true"
              :placeholder="
                img(
                  `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
                  { h: 10, f: 'png', blur: 2, q: 50 }
                )
              "
              @load="imgLoadHandler"
            />
            <div v-if="book.title" class="text-center">
              {{ book.title }}
            </div>
          </div>
          <div v-else :id="`book_slide_${i}`">
            <NuxtImg
              class="object-contain w-full"
              src="https://placehold.co/490x670/trasnparent/white"
            />
            <div v-if="book.title" class="text-center">
              {{ book.title }}
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>

    <div @click="shake">shake</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Keyboard, Mousewheel } from "swiper/modules";
import type { Book } from "~/types/books.types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { createDraggable } from "./utils/createDraggable";
import { shakeSlide } from "./utils/shakeSlide";

const props = defineProps({
  books: {
    type: Array as () => Book[],
    required: true,
  },
  isLoading: {
    type: Boolean,
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

const img = useImage();

onMounted(() => {
  gsap.registerPlugin(Draggable);
});

const modules = [Keyboard, Mousewheel];

const swiperInstance = ref<SwiperClass>({} as SwiperClass);
const activeIndex = ref(0);
const firstImgIsLoaded = ref(false);
console.log({ firstImgIsLoaded });

const setSwiper = (swiper: SwiperClass) => {
  swiperInstance.value = swiper;
};

const handleSlideChange = (swiper: SwiperClass) => {
  activeIndex.value = swiper.activeIndex;
  createDraggable(swiper.activeIndex, swiper);

  props.onSlideChange?.(swiper.activeIndex);
};

const imgLoadHandler = () => {
  setTimeout(() => {
    firstImgIsLoaded.value = true;
  }, 600);
};

const shake = () => {
  if (swiperInstance.value.activeIndex === 0) {
    shakeSlide(swiperInstance.value.slides[activeIndex.value]);
  }
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

watch(firstImgIsLoaded, (newVal) => {
  if (newVal) {
    nextTick(() => {
      shake();
    });
  }
});
</script>
