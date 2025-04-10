import { adminService } from "@/services";

export const update = async (id, payload) => {
  const response = await adminService.updateAdmin(id, payload);
  return response;
}
