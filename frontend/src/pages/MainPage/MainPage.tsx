import {useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import styled from 'styled-components';

import {TokSlider} from '~/widgets';
import {booksAPI} from '~/shared/api';
import {colors} from '~/shared/theme';

const MainPageWrapper = styled.div`
  position: relative;
  background-color: ${colors.bg};
  width: 100vw;
  height: 100vh;

  display: flex;
`;

const MainPageInfoWrapper = styled.div<{right?: boolean; left?: boolean}>`
  padding: 20px;
  height: 100%;
  overflow: auto;
  flex-shrink: 0;
  width: 25%;
  border-left: ${({left}) => !left && `2px solid ${colors.secondary}`};
  border-right: ${({right}) => !right && `2px solid ${colors.secondary}`};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    width: 15px;
    border-radius: 10px;
    background-color: ${colors.primary};

    &:hover {
      transition: all 0.3s ease-in-out;
      background-color: ${colors.secondary};
    }
  }
`;

const MainPageInfoTitleWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MainPageTitle = styled.h1`
  font-size: 3rem;
  color: ${colors.primary};
  margin: 0;
  z-index: 50;
`;

const MainPageCount = styled.h1`
  font-size: 1rem;
  color: ${colors.primary};
  margin: 0;
  z-index: 50;
  margin-top: 15px;
`;

const AdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
  height: auto;

  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;

const AdContainer = styled.div`
  width: 300px;
  height: 275px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

export const MainPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {data, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['books'],
    initialPageParam: 1,
    queryFn: ({pageParam = 1}) => booksAPI.getBooks({page: pageParam}),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Теперь lastPage содержит nextPage
  });

  const allBooks = data?.pages.flatMap((page) => page.books) || [];
  console.log('allBooks', allBooks);

  return (
    <MainPageWrapper>
      <MainPageInfoWrapper left>
        <MainPageInfoTitleWrapper>
          <MainPageTitle>БукТок</MainPageTitle>
          {!isLoading && (
            <MainPageCount>{`${activeIndex + 1} / ${allBooks.length}`}</MainPageCount>
          )}
        </MainPageInfoTitleWrapper>
        <AdWrapper>
          <AdContainer>Тут могла быть ваша реклама</AdContainer>
          <AdContainer>Тут могла быть ваша реклама</AdContainer>
        </AdWrapper>
      </MainPageInfoWrapper>
      <TokSlider
        books={allBooks}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        onSlideChange={(index) => setActiveIndex(index)}
      />
      <MainPageInfoWrapper right>
        <MainPageTitle>{allBooks[activeIndex]?.title}</MainPageTitle>
        <AdWrapper>
          <AdContainer>
            {allBooks[activeIndex]?.author_name
              .slice(0, 3)
              .map((author) => author)}
          </AdContainer>
        </AdWrapper>
      </MainPageInfoWrapper>
    </MainPageWrapper>
  );
};
