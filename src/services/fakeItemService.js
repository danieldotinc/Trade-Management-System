import * as genresAPI from "./fakeTypeService";

const businessItems = [
  {
    id: "1",
    name: "حمید مرادی",
    type: "ظروف چینی",
    transaction: "1,546,000",
    city: "اراک"
  },
  {
    id: "2",
    name: "سالار اقبالی",
    type: "جهیزیه",
    transaction: "13,780,000",
    city: "اصفهان"
  },
  {
    id: "3",
    name: "مهدی احمدوند",
    type: "ظروف مسی",
    transaction: "850,000",
    city: "بندرعباس"
  },
  {
    id: "4",
    name: "شایان پورعماد",
    type: "دکوراتیو",
    transaction: "4,562,000",
    city: "شیراز"
  },
  {
    id: "5",
    name: "سامان شهبازپور",
    type: "صنایع دستی",
    transaction: "320,000",
    city: "کرج"
  },
  {
    id: "6",
    name: "بهمن امام",
    type: "وسایل برقی",
    transaction: "16,140,000",
    city: "تهران"
  }
];

const employeesItems = [
  {
    id: "1",
    name: "دانیال دانشی",
    type: "واحد فنی",
    telephone: "214"
  },
  {
    id: "2",
    name: "مهدی بیات",
    type: "واحد بازرگانی",
    telephone: "218"
  },
  {
    id: "3",
    name: "عاطفه کریمی",
    type: "واحد مالی",
    telephone: "207"
  },
  {
    id: "4",
    name: "پگاه جمشیدی",
    type: "واحد فروش",
    telephone: "200"
  },
  {
    id: "5",
    name: "سعید شمس",
    type: "واحد منابع انسانی",
    telephone: "223"
  },
  {
    id: "6",
    name: "محسن شمس",
    type: "مدیر پروژه",
    telephone: "215"
  },
  {
    id: "7",
    name: "فریماه حیدری",
    type: "واحد فروش",
    telephone: "202"
  },
  {
    id: "8",
    name: "الهام بهرامی",
    type: "واحد فروش",
    telephone: "211"
  },
  {
    id: "9",
    name: "فاطمه فصیحی",
    type: "واحد مالی",
    telephone: "206"
  }
];

export function getBusinessItems() {
  return businessItems;
}

export function getEmployeesItems() {
  return employeesItems;
}

export function getBusinessItem(id) {
  return businessItems.find(m => m.id === id);
}

// export function saveItem(item) {
//   let itemInDb = businessItems.find(m => m.id === item.id) || {};
//   itemInDb.name = item.name;
//   itemInDb.type = genresAPI.genres.find(g => g._id === movie.genreId);
//   itemInDb.numberInStock = item.numberInStock;
//   itemInDb.dailyRentalRate = item.dailyRentalRate;

//   if (!itemInDb.id) {
//     itemInDb.id = Date.now();
//     businessItems.push(itemInDb);
//   }

//   return itemInDb;
// }

export function deleteBusinessItem(id) {
  let itemInDb = businessItems.find(m => m.id === id);
  businessItems.splice(businessItems.indexOf(itemInDb), 1);
  return itemInDb;
}

export function deleteEmployeeItem(id) {
  let itemInDb = employeesItems.find(m => m.id === id);
  employeesItems.splice(employeesItems.indexOf(itemInDb), 1);
  return itemInDb;
}
