import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Swiper, { Swiper as SwiperClass } from "swiper";

export const createDraggable = (
  index: number,
  swiper: SwiperClass,
  onSwipe?: (direction: "left" | "right") => void
) => {
  gsap.registerPlugin(Draggable);

  const element = document.querySelector(
    `#book_slide_${index}`
  ) as HTMLDivElement;
  const container = document.querySelector("#container") as HTMLDivElement;
  const threshold = window.innerWidth * 0.07;
  if (!element || !container) return;

  Draggable.create(element, {
    type: "x",
    inertia: false,
    bounds: {
      minX: -window.innerWidth * 0.8,
      maxX: window.innerWidth * 0.8,
    },
    edgeResistance: 0.8,
    onPress() {
      gsap.set(element, { transition: "none" });
    },
    onDrag() {
      // Добавляем вращение при движении
      const rotation = this.x * 0.1;
      gsap.set(element, { rotation, force3D: true });

      // Меняем фон при выходе за пороговые значения
      const opacity = 1 - Math.abs(this.x) / (window.innerWidth * 0.4);
      gsap.set(element, { opacity });

      if (this.x > threshold) {
        container.style.background = "rgba(0, 200, 0, 0.5)";
      } else if (this.x < -threshold) {
        container.style.background = "rgba(200, 0, 0, 0.5)";
      } else {
        container.style.background = "transparent";
      }
    },
    onDragEnd() {
      // Определяем направление свайпа по позиции и скорости
      if (this.x > threshold) {
        swipeRight();
        goToNextSlide(swiper);
      } else if (this.x < -threshold) {
        swipeLeft();
        goToNextSlide(swiper);
      }
      resetPosition();

      function swipeRight() {
        gsap.to(element, {
          x: window.innerWidth * 1.5,
          rotation: 25,
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            onSwipe?.("right");
          },
        });
      }

      function swipeLeft() {
        gsap.to(element, {
          x: -window.innerWidth * 1.5,
          rotation: -25,
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            onSwipe?.("left");
          },
        });
      }

      function resetPosition() {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          background: "transparent",
          duration: 0.5,
          ease: "power2.out",
        });
        container.style.background = "transparent";
      }
    },
  });
};

const goToNextSlide = (swiperInstance: Swiper) => {
  swiperInstance?.slideNext();
};
