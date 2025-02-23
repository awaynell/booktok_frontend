import {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Keyboard, Mousewheel} from 'swiper/modules';
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';

//@ts-ignore
import 'swiper/css';

import {Book} from '~/entities';
import {changeTheme, colors} from '~/shared/theme';

import {generateRandomHexColor} from './utils';

const Wrapper = styled.div<{themeColor: typeof colors}>`
  width: 100%;
  height: 100vh;
  background-color: ${({themeColor}) => themeColor.bg};
  padding: 25px;
  transition: all 0.3s ease-in-out;
`;

const StyledSwiper = styled(Swiper)<{themeColor: typeof colors}>`
  height: 100%;
  max-width: 520px;
  min-width: 425px;
  background-color: ${({themeColor}) => themeColor.primary};
  border-radius: 20px;
  padding: 25px;
  transition: all 0.3s ease-in-out;
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
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 -2px 4px rgba(255, 255, 255, 0.5);

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
      fetchNextPage();
    }
  }, [activeIndex, books.length, fetchNextPage, swiper]);

  useEffect(() => {
    swiper?.update();
  }, [books]);

  return (
    <Wrapper themeColor={colors}>
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
            changeTheme({
              secondary: generateRandomHexColor(),
              primary: generateRandomHexColor(),
              bg: generateRandomHexColor(),
            });
          }
        }}
        mousewheel
        keyboard
        modules={[Keyboard, Mousewheel]}
        themeColor={colors}
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
