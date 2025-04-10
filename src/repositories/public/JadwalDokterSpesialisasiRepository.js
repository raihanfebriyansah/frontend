import { publicJadwalDokterSpesialisasiService } from "@/services";

export const takeAll = async () => {
  const response = await publicJadwalDokterSpesialisasiService.takeAll();
  return response;
}