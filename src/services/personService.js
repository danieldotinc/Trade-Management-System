import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getPersons() {
  return http.get(`${apiUrl}/persons`);
}

export async function deletePerson(id) {
  return http.delete(`${apiUrl}/persons/${id}`);
}
