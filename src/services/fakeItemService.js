import * as genresAPI from "./fakeTypeService";

const items = [
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

export function getItems() {
  return items;
}

export function getItem(id) {
  return items.find(m => m.id === id);
}

// export function saveItem(item) {
//   let itemInDb = items.find(m => m.id === item.id) || {};
//   itemInDb.name = item.name;
//   itemInDb.type = genresAPI.genres.find(g => g._id === movie.genreId);
//   itemInDb.numberInStock = item.numberInStock;
//   itemInDb.dailyRentalRate = item.dailyRentalRate;

//   if (!itemInDb.id) {
//     itemInDb.id = Date.now();
//     items.push(itemInDb);
//   }

//   return itemInDb;
// }

export function deleteItem(id) {
  let itemInDb = items.find(m => m.id === id);
  items.splice(items.indexOf(itemInDb), 1);
  return itemInDb;
}
