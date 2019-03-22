import http from "./httpService";

export async function getOfficeSectors() {
  return http.get(`/officeSectors`);
}

export async function deleteMarketSector(id) {
  return http.delete(`/officeSectors/${id}`);
}
