import axiosInstance from "@/lib/axios";

// 1. Get Settings
export const getSiteSettings = async () => {
  const { data } = await axiosInstance.get("/site-settings");
  return data;
};

// 2. Update Settings (Upsert)
export const updateSiteSettings = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/site-settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
