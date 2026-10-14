/**
 * Phone-only swipe carousel: below `md` the list scrolls horizontally with snap points
 * (the next card peeks in to hint at swiping); from `md` up it becomes a regular grid.
 * Add the grid columns (e.g. `md:grid-cols-2`) next to `carouselList`.
 */
export const carouselList =
  '-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-3 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:gap-6 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden';

export const carouselItem = 'w-[85%] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none';
