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
  { label: "تراکنش مالی", path: "transaction" },
  { label: "شهر", path: "city" },
  {},
  {},
  {}
];

export const businessColumns = [
  { label: "ID", path: "id" },
  { label: "نام", path: "name" },
  { label: "حوزه فعالیت", path: "type" },
  { label: "تراکنش مالی", path: "transaction" },
  { label: "شهر", path: "city" },
  {},
  {},
  {}
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
