export const types = [
  { id: 1, name: "ظروف چینی" },
  { id: 2, name: "جهیزیه" },
  { id: 3, name: "ظروف مسی" },
  { id: 4, name: "دکوراتیو" },
  { id: 5, name: "صنایع دستی" },
  { id: 6, name: "لوازم برقی" }
];

export function getTypes() {
  return types.filter(g => g);
}
