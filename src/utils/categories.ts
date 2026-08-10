import type { Category } from "@/payload-types";

export function getCategoryName(category: number | Category): string {
  return typeof category === 'object' ? category.name : '';
}
