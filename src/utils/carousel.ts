/**
 * carousel.ts — Утсан дээр хажуу тийш гүйлгэдэг картын жагсаалтын загвар.
 *
 * Утсан дээр (768px-ээс бага): картууд нэг мөрөнд жагсаж, хуруугаар хажуу тийш
 * гүйлгэнэ; дараагийн карт ирмэгээрээ цухуйж харагдана ("гүйлгэж болно" гэсэн дохио).
 * Таблет / компьютер дээр (md-ээс дээш): ердийн тор (grid) болно.
 *
 * Хэрэглээ: <ul className={cn(carouselList, 'md:grid-cols-2')}>
 *             <li className={carouselItem}>…</li>
 * Үнийн багцууд (PricingSection) ба шийдлүүд (SolutionsSection)-д ашиглагдсан.
 */

/** Жагсаалтын (ul) class-ууд: гүйлгэх, зогсох цэг (snap), scrollbar нуух. */
export const carouselList =
  '-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-3 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:gap-6 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden';

/** Карт бүрийн (li) class-ууд: утсан дээр дэлгэцийн 85% өргөн, md-ээс дээш торны нүд. */
export const carouselItem = 'w-[85%] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none';
