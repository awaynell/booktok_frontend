<template>
  <div
    class="h-[95%] shadow-2xl relative rounded-xl border-2 border-gray-200 overflow-hidden"
    :id="`book_slide_${idx}`"
  >
    <template v-if="book.cover_i">
      <div
        v-if="!imgLoadedState[book.cover_i]"
        class="w-full h-full flex justify-center items-center absolute top-0 left-0"
      >
        <Loader />
      </div>

      <NuxtImg
        :class="
          cn(
            'w-full h-full rounded-xl object-cover transition-all duration-300 ease-in-out',
            {
              'opacity-0': !imgLoadedState[book.cover_i],
            }
          )
        "
        :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
        loading="lazy"
        @load="imgLoadHandler(book.cover_i)"
      />
    </template>

    <!-- Fallback для книг без обложки -->
    <NuxtImg
      v-else
      class="w-full h-full object-cover"
      src="https://placehold.co/1000x1000/black/17"
      @load="imgLoadHandler(book.cover_i)"
    />
    <BookInfo :book="book" v-if="imgLoadedState[book.cover_i]" />
    <div
      class="absolute right-2 top-1/2 z-20 p-2 cursor-pointer"
      v-if="imgLoadedState[book.cover_i]"
    >
      <CommentIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper";
import { watch, ref, reactive, nextTick } from "vue";
import type { PropType } from "vue";
import { cn } from "~/theme";
import { type Book } from "~/types/books.types";
import { shakeSlide } from "../utils/shakeSlide";
import BookInfo from "./BookInfo.vue";
import CommentIcon from "~/components/Icons/CommentIcon.vue";

const props = defineProps({
  swiperInstance: { type: Swiper, required: true },
  activeIndex: { type: Number, required: true },
  book: { type: Object as PropType<Book>, required: true },
  idx: { type: Number, required: true },
});

const { swiperInstance, activeIndex, book, idx } = props;

const firstImgIsLoaded = ref(false);
const imgLoadedState = reactive<Record<number, boolean>>({});

const shake = () => {
  if (swiperInstance.activeIndex === 0) {
    shakeSlide(swiperInstance.slides[activeIndex]);
  }
};

const imgLoadHandler = (coverId: number) => {
  if (!coverId) return;

  console.log(coverId);
  nextTick(() => {
    imgLoadedState[coverId] = true;
    // if (swiperInstance.activeIndex === 0 && !firstImgIsLoaded.value) {
    //   setTimeout(() => {
    //     firstImgIsLoaded.value = true;
    //     shake();
    //   }, 300);
    // }
  });
};

watch(firstImgIsLoaded, (newVal) => {
  if (newVal) {
    nextTick(() => {
      shake();
    });
  }
});
</script>
