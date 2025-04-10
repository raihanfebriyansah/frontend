import { publicRiwayatService } from "@/services";

export const getRiwayat = async (id) => {
  const response = await publicRiwayatService.fetchRiwayat(id);
  return response;
}

export const cancelReservasi = async (id) => {
  const response = await publicRiwayatService.cancelReservasi(id);
  return response;
}

export const getAntrian = async (id) => {
  const response = await publicRiwayatService.getAntrian(id);
  return response;
}

export const getRiwayatById = async (id) => {
  const response = await publicRiwayatService.getRiwayatById(id);
  return response;
}