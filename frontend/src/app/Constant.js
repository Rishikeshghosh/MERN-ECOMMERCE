export const ITEMS_PER_PAGE = 10;
export function discountPrice(item) {
  return Math.round(item.price * (1 - item.discountPricePercentage / 100), 2);
}