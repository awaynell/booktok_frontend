<template>
  <div
    class="w-full h-screen p-6 transition-all duration-300 ease-in-out"
    :style="wrapperStyle"
  >
    <swiper
      class="h-full max-w-[520px] min-w-[425px] rounded-xl p-6 transition-all duration-300 ease-in-out"
      :style="swiperStyle"
      :direction="'vertical'"
      :modules="modules"
      :slides-per-view="1"
      :space-between="25"
      :mousewheel="true"
      :keyboard="true"
      @swiper="setSwiper"
      @slide-change="handleSlideChange"
    >
      <swiper-slide v-if="isLoading" class="slide-style">
        <div class="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      </swiper-slide>

      <template v-else>
        <swiper-slide
          v-for="book in books"
          :key="book.cover_i"
          class="slide-style p-3.5"
        >
          <NuxtImg
            loading="lazy"
            class="w-full h-full object-contain rounded-xl transition-all duration-300 ease-in-out"
            :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
          />
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Keyboard, Mousewheel } from "swiper/modules";
import type { Book } from "~/types/books.types";
import { changeTheme } from "~/theme";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const modules = [Keyboard, Mousewheel];

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

const swiperInstance = ref<SwiperClass | null>(null);
const activeIndex = ref(0);

const wrapperStyle = computed(() => ({
  backgroundColor: colors.value.bg,
}));

const swiperStyle = computed(() => ({
  backgroundColor: colors.value.primary,
}));

const colors = ref({
  bg: generateRandomHexColor(),
  primary: generateRandomHexColor(),
  secondary: generateRandomHexColor(),
});

const setSwiper = (swiper: SwiperClass) => {
  swiperInstance.value = swiper;
};

const handleSlideChange = (swiper: SwiperClass) => {
  activeIndex.value = swiper.activeIndex;
  props.onSlideChange?.(swiper.activeIndex);

  const newColors = {
    secondary: generateRandomHexColor(),
    primary: generateRandomHexColor(),
    bg: generateRandomHexColor(),
  };

  colors.value = newColors;
  changeTheme(newColors);
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

watch(
  () => props.books,
  () => {
    swiperInstance.value?.update();
  }
);
</script>

<!-- <style>
.slide-style {
  @apply w-full relative flex justify-center items-center bg-transparent rounded-lg mx-auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 -2px 4px rgba(255, 255, 255, 0.5);
}

.swiper {
  @apply h-full;
}
</style> -->
