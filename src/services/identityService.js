import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getIdentities() {
  return http.get(`${apiUrl}/identities`);
}

export async function deleteCategory(id) {
  return http.delete(`${apiUrl}/identities/${id}`);
}
