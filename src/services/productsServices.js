import http from "./httpService";
import { apiUrl } from "../config.json";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhlODZlNDljZWI2OTBjZjhjNjU5OWMiLCJuYW1lIjoi2K_Yp9mG24zYp9mEINiv2KfZhti024wiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTI4NDQ4ODh9.a5ChgJ3oXnAjHABiD3SLnBTHPYI33aRguM93LyFuyRA";

export async function getProducts() {
  return http.get(`${apiUrl}/products`, {
    headers: {
      "x-auth-token": authToken //the token is a variable which holds the token
    }
  });
}

export async function deleteProduct(id) {
  return http.delete(`${apiUrl}/products/${id}`, {
    headers: {
      "x-auth-token": authToken //the token is a variable which holds the token
    }
  });
}
