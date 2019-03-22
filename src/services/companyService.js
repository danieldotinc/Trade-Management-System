import http from "./httpService";

export async function getCompanies() {
  return http.get(`/companies`);
}

export async function deleteCompany(id) {
  return http.delete(`/companies/${id}`);
}
