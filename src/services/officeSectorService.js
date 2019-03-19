import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getOfficeSectors() {
  return http.get(`${apiUrl}/officeSectors`);
}

export async function deleteMarketSector(id) {
  return http.delete(`${apiUrl}/officeSectors/${id}`);
}
