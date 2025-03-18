<template>
  <div class="p-5 rounded-lg absolute bottom-0 z-20 w-full bg-emerald-900/80">
    <p>Название: {{ book.title }}</p>
    <p>Автор: {{ book.author_name?.slice(0, 3).join(", ") }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Book } from "~/types/books.types";

const { book } = defineProps({
  book: { type: Object as PropType<Book>, required: true },
});
</script>
