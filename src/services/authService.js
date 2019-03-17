import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = `${apiUrl}/auth`;
const keyToken = "token";

export async function login(user) {
  const { data: jwt } = await http.post(apiEndPoint, user);
  localStorage.setItem(keyToken, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(keyToken, jwt);
}

export function logout() {
  localStorage.removeItem(keyToken);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(keyToken);
    return jwtDecode(jwt);
  } catch (ex) {}
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};
