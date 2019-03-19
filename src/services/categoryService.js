import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getCategories() {
  return http.get(`${apiUrl}/categories`);
}

export async function deleteCategory(id) {
  return http.delete(`${apiUrl}/categories/${id}`);
}
