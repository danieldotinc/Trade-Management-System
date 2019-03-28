import http from "./httpService";

export async function getProduct(id) {
  return http.get(`/products/${id}`);
}

export async function getProducts() {
  return http.get(`/products`);
}

export async function deleteProduct(id) {
  return http.delete(`/products/${id}`);
}

export async function saveProduct(item) {
  return http.post(`/products`, item);
}

export async function updateProduct(item) {
  const body = { ...item };
  delete body._id;
  return http.put(`/products/${item._id}`, body);
}
