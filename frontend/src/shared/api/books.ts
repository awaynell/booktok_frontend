import {Book} from '~/entities';

import {openLibraryApiClient} from './apiClient';

export const booksAPI = {
  getBooks: async ({page = 1}): Promise<{books: Book[]; nextPage?: number}> => {
    const limit = 5;
    const {data} = await openLibraryApiClient.get(
      `/search.json?q=q&page=${page}&limit=${limit}&sort=random`,
    );

    const books = data.docs.filter((book: Book) => book?.cover_i);
    const hasMore = books.length === limit; // Проверяем, есть ли ещё данные
    return {books, nextPage: hasMore ? page + 1 : undefined};
  },
};
