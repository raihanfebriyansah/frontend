import { publicReservasiService } from "@/services";

export const reservasi = async (data) => {
  const response = await publicReservasiService.reservasi(data.id, data);
  return response;
}