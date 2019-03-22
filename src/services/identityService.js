import http from "./httpService";

export async function getIdentities() {
  return http.get(`/identities`);
}

export async function deleteCategory(id) {
  return http.delete(`/identities/${id}`);
}
