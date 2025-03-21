import type { Book } from "~/types/books.types";
import { type Reactive, type Ref } from "vue";
import type { AsyncDataRequestStatus } from "#app";

export const booksAPI = {
  getBooks: async (
    page: Ref<number>,
    limit: number,
    items: Reactive<Book[]>
  ): Promise<{
    refresh: (opts?: Record<string, any>) => Promise<void>;
    status: Ref<AsyncDataRequestStatus, AsyncDataRequestStatus>;
  }> => {
    const config = useRuntimeConfig();

    const { error, refresh, status } = await useAsyncData(
      `books:${Date.now()}`,
      () =>
        $fetch("/search.json", {
          baseURL: config.public.apiUrl,
          query: {
            page: page.value,
            limit: limit,
            sort: "random",
            q: "q",
            land: "rus",
          },
          onResponse: ({ response }) => {
            if (response.ok) {
              const books = response._data.docs.filter(
                (book: Book) => book.cover_i
              );

              items.push(...books);
            }
          },
        }),
      {
        watch: [page],
        getCachedData(key, nuxt) {
          return null;
        },
      }
    );

    if (error.value) {
      console.error("Ошибка загрузки данных:", error.value);
    }

    return {
      refresh,
      status,
    };
  },
};
