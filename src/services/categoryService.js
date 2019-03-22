import http from "./httpService";

export async function getCategories() {
  return http.get(`/categories`);
}

export async function deleteCategory(id) {
  return http.delete(`/categories/${id}`);
}
