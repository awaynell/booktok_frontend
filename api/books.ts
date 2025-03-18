import type { Book } from "~/types/books.types";
import { openLibraryApiClient } from "./apiClient";
import { type Reactive, type Ref } from "vue";
import type { AsyncDataRequestStatus } from "#app";

export const booksAPI = {
  getBooks: async ({
    page = 1,
  }): Promise<{ books: Book[]; nextPage?: number }> => {
    const limit = 5;
    const { data } = await openLibraryApiClient.get(
      `/search.json?q=q&page=${page}&limit=${limit}&sort=random`
    );

    const books = data.docs.filter((book: Book) => book?.cover_i);
    const hasMore = books.length === limit; // Проверяем, есть ли ещё данные
    return { books, nextPage: hasMore ? page + 1 : undefined };
  },
  getBooksV2: async (
    page: Ref<number>,
    limit: number,
    items: Reactive<Book[]>
  ): Promise<{
    refresh: (opts?: Record<string, any>) => Promise<void>;
    status: Ref<AsyncDataRequestStatus, AsyncDataRequestStatus>;
  }> => {
    const config = useRuntimeConfig();
    console.log({ baseUrl: config.public.apiUrl });
    const { error, refresh, status, pending } = await useAsyncData(
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
