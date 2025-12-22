import axiosInstance from "@/lib/axios";

// 0. 

// 1. Get All Messages (Supports pagination if needed, or simple list)
export const getAllContacts = async () => {
  const { data } = await axiosInstance.get("/contacts");
  return data;
};

// 2. Delete Message
export const deleteContact = async (id: string) => {
  const { data } = await axiosInstance.delete(`/contacts/${id}`);
  return data;
};

// 3. Mark as Read
export const markAsRead = async (id: string) => {
  const { data } = await axiosInstance.patch(`/contacts/${id}/read`, {});
  return data;
};


