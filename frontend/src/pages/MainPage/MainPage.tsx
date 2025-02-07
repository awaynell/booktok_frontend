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
  transition: all 0.3s ease-in-out;
`;

const MainPageInfoWrapper = styled.div<{
  themeColor: typeof colors;
  right?: boolean;
  left?: boolean;
}>`
  padding: 20px;
  height: 100%;
  overflow: auto;
  flex-shrink: 0;
  width: 25%;
  border-left: ${({left, themeColor}) =>
    !left && `2px solid ${themeColor?.secondary}`};
  border-right: ${({right, themeColor}) =>
    !right && `2px solid ${themeColor?.secondary}`};
  transition: all 0.3s ease-in-out;
  background-color: ${({themeColor}) => themeColor?.bg};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    width: 15px;
    border-radius: 10px;
    background-color: ${({themeColor}) => themeColor?.primary};

    &:hover {
      transition: all 0.3s ease-in-out;
      background-color: ${({themeColor}) => themeColor?.secondary};
    }
  }
`;

const MainPageInfoTitleWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease-in-out;
`;

const MainPageTitle = styled.h1<{themeColor: typeof colors}>`
  font-size: 3rem;
  color: ${({themeColor}) => themeColor.primary};
  margin: 0;
  z-index: 50;
  transition: all 0.3s ease-in-out;
`;

const MainPageCount = styled.h1<{themeColor: typeof colors}>`
  font-size: 1rem;
  color: ${({themeColor}) => themeColor.primary};
  margin: 0;
  z-index: 50;
  margin-top: 15px;
  transition: all 0.3s ease-in-out;
`;

const AdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
  height: auto;
  transition: all 0.3s ease-in-out;

  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;

const AdContainer = styled.div<{themeColor: typeof colors}>`
  width: 300px;
  height: 275px;
  background-color: ${({themeColor}) => themeColor.secondary};
  color: ${({themeColor}) => themeColor.primary};
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

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
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const allBooks = data?.pages.flatMap((page) => page.books) || [];

  return (
    <MainPageWrapper>
      <MainPageInfoWrapper left themeColor={colors}>
        <MainPageInfoTitleWrapper>
          <MainPageTitle themeColor={colors}>БукТок</MainPageTitle>
          {!isLoading && (
            <MainPageCount
              themeColor={colors}
            >{`${activeIndex + 1} / ${allBooks.length}`}</MainPageCount>
          )}
        </MainPageInfoTitleWrapper>
        <AdWrapper>
          <AdContainer themeColor={colors}>
            Тут могла быть ваша реклама
          </AdContainer>
          <AdContainer themeColor={colors}>
            Тут могла быть ваша реклама
          </AdContainer>
        </AdWrapper>
      </MainPageInfoWrapper>
      <TokSlider
        books={allBooks}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        onSlideChange={(index) => setActiveIndex(index)}
      />
      <MainPageInfoWrapper right themeColor={colors}>
        <MainPageTitle themeColor={colors}>
          {allBooks[activeIndex]?.title}
        </MainPageTitle>
        <AdWrapper>
          <AdContainer themeColor={colors}>
            {allBooks[activeIndex]?.author_name
              .slice(0, 3)
              .map((author) => author)}
          </AdContainer>
        </AdWrapper>
      </MainPageInfoWrapper>
    </MainPageWrapper>
  );
};
