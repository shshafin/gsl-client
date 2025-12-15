import axiosInstance from "@/lib/axios";

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const getSingleUser = async (id: string) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data;
};

export const createUser = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/users/create-user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateUser = async (id: string, formData: FormData) => {
  const { data } = await axiosInstance.patch(`/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};
