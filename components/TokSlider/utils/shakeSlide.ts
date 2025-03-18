import { gsap } from "gsap";

export const shakeSlide = (
  element: HTMLElement | null,
  onComplete?: () => void
) => {
  if (!element) return;

  const tl = gsap.timeline({ onComplete });

  tl.to(element, {
    x: "+=" + window.innerWidth * 0.1,
    rotation: 10,
    duration: 0.55,
  })
    .to(element, {
      x: "-=" + window.innerWidth * 0.2,
      rotation: -10,
      duration: 0.55,
    })
    .to(element, {
      x: 0,
      rotation: 0,
      duration: 0.55,
    });
};
