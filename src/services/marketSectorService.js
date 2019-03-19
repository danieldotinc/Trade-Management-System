import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getMarketSectors() {
  return http.get(`${apiUrl}/marketSectors`);
}

export async function deleteMarketSector(id) {
  return http.delete(`${apiUrl}/marketSectors/${id}`);
}
