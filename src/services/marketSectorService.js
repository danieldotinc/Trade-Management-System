import http from "./httpService";

export async function getMarketSectors() {
  return http.get(`/marketSectors`);
}

export async function deleteMarketSector(id) {
  return http.delete(`/marketSectors/${id}`);
}
