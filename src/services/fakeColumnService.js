export const employeeColumns = [
  { label: "ID", path: "id" },
  { label: "نام", path: "name" },
  { label: "واحد فعالیت", path: "type" },
  { label: "تلفن اینترنتی", path: "telephone" },
  {},
  {},
  {}
];

export const customerColumns = [
  { label: "ID", path: "id" },
  { label: "نام", path: "name" },
  { label: "هویت", path: "identityType" },
  { label: "حوزه فعالیت", path: "type" },
  { label: "موبایل", path: "mobile" },
  { label: "تلفن", path: "telephone" },
  { label: "اعتبار", path: "credit" },
  { label: "شهر", path: "city" },
  { label: "", path: "" }
];

export const businessColumns = [
  { label: "نام", path: "name" },
  { label: "نام کسب وکار", path: "company" },
  { label: "حوزه فعالیت", path: "marketSector" },
  { label: "موبایل", path: "mobile" },
  { label: "تلفن", path: "telephone" },
  { label: "داخلی", path: "telExtention" },
  { label: "اعتبار", path: "credit" },
  { label: "شهر", path: "city" },
  { label: "", path: "" }
];

export const productColumns = [
  { label: "عکس", path: "img" },
  { label: "دسته بندی", path: "category" },
  { label: "کد محصول", path: "proCode" },
  { label: "کد تنوع", path: "diverseCode" },
  { label: "عنوان", path: "name" },
  { label: "برند", path: "brand" },
  { label: "قیمت مرجع", path: "refPrice" },
  { label: "قیمت عمده", path: "wholePrice" },
  { label: "قیمت تکی", path: "retailPrice" },
  { label: "", path: "" }
];

export function getBusinessColumns() {
  return businessColumns.filter(g => g);
}

export function getEmployeeColumns() {
  return employeeColumns.filter(g => g);
}

export function getCustomerColumns() {
  return customerColumns.filter(g => g);
}

export function getProductColumns() {
  return productColumns.filter(g => g);
}
