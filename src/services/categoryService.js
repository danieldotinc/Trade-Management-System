import http from "./httpService";
import { apiUrl } from "../config.json";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhjZDllNTJhOTM4YTFmYjAzZGJkMTQiLCJuYW1lIjoiU2FyYWggU2VpZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU1Mjg5MDUzNn0.Z4ZO88JbLyDnSoZ9lVXiKaSE2F7qZUO05sTxnzugeJQ";

export async function getCategories() {
  return http.get(`${apiUrl}/categories`, {
    headers: {
      "x-auth-token": authToken //the token is a variable which holds the token
    }
  });
}

export async function deleteCategory(id) {
  return http.delete(`${apiUrl}/categories/${id}`, {
    headers: {
      "x-auth-token": authToken //the token is a variable which holds the token
    }
  });
}
