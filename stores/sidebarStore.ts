import type { Review } from "~/types/review.types";

interface SidebarState {
  reviews: Review[];
  isOpen: boolean;
}

export const useSidebarStore = defineStore("sidebar", {
  state: (): SidebarState => ({ isOpen: false, reviews: [] }),
  actions: {
    setSidebarIsOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    setReviews(reviews: Review[]) {
      this.reviews = reviews;
    },
  },
});
