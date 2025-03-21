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
  const greenLight = document.querySelector("#greenLight") as HTMLSpanElement;
  const redLight = document.querySelector("#redLight") as HTMLSpanElement;

  if (!element || !greenLight || !redLight) return;

  const threshold = window.innerWidth * 0.15;
  let draggableInstance: Draggable;

  const resetLight = () => {
    greenLight.style.opacity = "0";
    redLight.style.opacity = "0";
  };

  const resetPosition = () => {
    // Останавливаем все текущие анимации перед сбросом позиции
    gsap.killTweensOf(element);
    gsap.to(element, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto", // Автоматически перезаписывает конфликтующие свойства
    });
  };

  if (element) {
    // Уничтожаем предыдущий экземпляр Draggable, если существует
    if ((element as any)._gsapDraggable) {
      (element as any)._gsapDraggable.kill();
    }

    draggableInstance = Draggable.create(element, {
      type: "x",
      inertia: false,
      bounds: {
        minX: -window.innerWidth * 0.8,
        maxX: window.innerWidth * 0.8,
      },
      edgeResistance: 0.8,
      onPress() {
        // Останавливаем все анимации при начале перетаскивания
        gsap.killTweensOf(element);
        gsap.set(element, { transition: "none", overwrite: "auto" });
      },
      onDrag() {
        const rotation = this.x * 0.1;
        const opacity = 1 - Math.abs(this.x) / (window.innerWidth * 0.4);

        // Используем быстрый set вместо анимации
        gsap.set(element, {
          rotation,
          opacity,
          overwrite: "auto",
        });

        if (this.x > threshold) {
          greenLight.style.opacity = "1";
        } else if (this.x < -threshold) {
          redLight.style.opacity = "1";
        } else {
          resetLight();
        }
      },
      onDragEnd() {
        const isRightSwipe = this.x > threshold;
        const isLeftSwipe = this.x < -threshold;

        if (isRightSwipe || isLeftSwipe) {
          gsap.killTweensOf(element);
          const targetX = isRightSwipe
            ? window.innerWidth * 1.5
            : -window.innerWidth * 1.5;
          const rotation = isRightSwipe ? 25 : -25;

          gsap.to(element, {
            x: targetX,
            rotation,
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
              onSwipe?.(isRightSwipe ? "right" : "left");
              resetLight();
              resetPosition();
              goToNextSlide(swiper);
            },
            overwrite: "auto",
          });
        } else {
          resetPosition();
          resetLight();
        }
      },
    })[0] as Draggable;

    // Сохраняем ссылку на экземпляр Draggable
    (element as any)._gsapDraggable = draggableInstance;
  }
};

const goToNextSlide = (swiperInstance: Swiper) => {
  swiperInstance?.slideNext();
};
