import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getProducts() {
  return http.get(`${apiUrl}/products`);
}

export async function deleteProduct(id) {
  return http.delete(`${apiUrl}/products/${id}`);
}

export async function saveProduct(item) {
  return http.post(`${apiUrl}/products`, item);
}

export async function updateProduct(item) {
  const body = { ...item };
  delete body._id;
  console.log(body);
  return http.put(`${apiUrl}/products/${item._id}`, body);
}
