export const businessTypes = [
  { id: 1, name: "ظروف چینی" },
  { id: 2, name: "جهیزیه" },
  { id: 3, name: "ظروف مسی" },
  { id: 4, name: "دکوراتیو" },
  { id: 5, name: "صنایع دستی" },
  { id: 6, name: "لوازم برقی" }
];

export const employeeTypes = [
  { id: 1, name: "واحد فنی" },
  { id: 2, name: "واحد بازرگانی" },
  { id: 3, name: "واحد مالی" },
  { id: 4, name: "واحد فروش" },
  { id: 5, name: "واحد منابع انسانی" },
  { id: 6, name: "مدیر پروژه" }
];

export function getBusinessTypes() {
  return businessTypes.filter(g => g);
}

export function getEmployeeTypes() {
  return employeeTypes.filter(g => g);
}
