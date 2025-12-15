import axiosInstance from "@/lib/axios";

// 1. Get All Resources
export const getAllResources = async () => {
  const { data } = await axiosInstance.get("/resources");
  return data;
};

// 2. Create Resource (FormData for PDF)
export const createResource = async (formData: FormData) => {
  const { data } = await axiosInstance.post(
    "/resources/create-resource",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

// 3. Delete Resource
export const deleteResource = async (id: string) => {
  const { data } = await axiosInstance.delete(`/resources/${id}`);
  return data;
};
