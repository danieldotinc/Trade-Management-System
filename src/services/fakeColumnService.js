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
  { label: "حوزه فعالیت", path: "type" },
  { label: "تراکنش مالی", path: "credit" },
  { label: "شهر", path: "city" },
  {},
  {},
  {}
];

export const businessColumns = [
  { label: "ID", path: "id" },
  { label: "نام", path: "name" },
  { label: "نام کسب وکار", path: "company" },
  { label: "حوزه فعالیت", path: "type" },
  { label: "موبایل", path: "mobile" },
  { label: "تلفن", path: "telephone" },
  { label: "داخلی", path: "telExtention" },
  { label: "اعتبار", path: "credit" },
  { label: "شهر", path: "city" },
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
