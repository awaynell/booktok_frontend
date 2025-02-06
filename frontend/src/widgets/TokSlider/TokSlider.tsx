import {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Keyboard, Mousewheel} from 'swiper/modules';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';

//@ts-ignore
import 'swiper/css';

import {Book} from '~/entities';
import {colors} from '~/shared/theme';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.bg};
  padding: 25px;
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  max-width: 520px;
  min-width: 425px;
  background-color: ${colors.primary};
  border-radius: 20px;
  padding: 25px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 10px;
  margin: 0 auto;

  img {
    border-radius: 20px;
  }
`;

type TokSliderProps = {
  books: Book[];
  isLoading: boolean;
  fetchNextPage: () => void;
  onSlideChange?: (index: number) => void;
};

export const TokSlider: FC<TokSliderProps> = ({
  books,
  isLoading,
  fetchNextPage,
  onSlideChange,
}) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiper && books.length > 0 && activeIndex === books.length - 2) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [activeIndex, books.length, fetchNextPage, swiper]);

  useEffect(() => {
    swiper?.update();
  }, [books]);

  return (
    <Wrapper>
      <StyledSwiper
        spaceBetween={25}
        slidesPerView={1}
        lazyPreloadPrevNext={3}
        direction="vertical"
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);

          if (onSlideChange) {
            onSlideChange(swiper.activeIndex);
          }
        }}
        mousewheel
        keyboard
        modules={[Keyboard, Mousewheel]}
      >
        {isLoading && <StyledSwiperSlide>Loading...</StyledSwiperSlide>}
        {!isLoading &&
          books.map((book) => (
            <StyledSwiperSlide key={book.cover_i}>
              <img
                loading="lazy"
                height={'100%'}
                width={'100%'}
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                style={{objectFit: 'contain', borderRadius: '20px'}}
              />
            </StyledSwiperSlide>
          ))}
      </StyledSwiper>
    </Wrapper>
  );
};
