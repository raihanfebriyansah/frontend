import { adminService } from "@/services";

export const update = async (id, formData) => {
  if (!id) {
    throw new Error("ID is required to update the admin.");
  }
  const response = await adminService.updateAdmin(id, formData);
  return response;
};
