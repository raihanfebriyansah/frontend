import { publicJadwalDokterUmumService } from "@/services";

export const takeAll = async () => {
  const response = await publicJadwalDokterUmumService.takeAll();
  return response;
}