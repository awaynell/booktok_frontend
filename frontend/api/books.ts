import type { Book } from "~/types/books.types";
import { openLibraryApiClient } from "./apiClient";
import { type Reactive, type Ref } from "vue";

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
    isLoading: boolean;
  }> => {
    const config = useRuntimeConfig();
    console.log({ baseUrl: config.public.apiUrl });
    const { data, error, refresh, status } = await useAsyncData(
      "books",
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
          key: `items-page-${page.value}`, // Уникальный ключ для кэширования каждой страницы
          onResponse: ({ response }) => {
            if (response.ok) {
              const books = response._data.docs;

              items.push(...books);
            }
          },
        }),
      {
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
      isLoading: status.value === "pending",
    };
  },
};
