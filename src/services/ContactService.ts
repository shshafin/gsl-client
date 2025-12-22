import axiosInstance from "@/lib/axios"; // Adjust path to your axios instance

// Types (You can also import this from your types definition file)
export interface IContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payload type for creating a message (excludes _id, dates, isRead)
export type CreateContactPayload = Pick<
  IContact,
  "name" | "email" | "subject" | "message"
>;

// =================================================================
// 📞 CONTACT API SERVICES
// =================================================================

// 1. Create New Contact Message (Public)
export const createContact = async (payload: CreateContactPayload) => {
  // Based on your backend router: router.post('/create-contact', ...)
  // Assuming the base route is /contacts
  const { data } = await axiosInstance.post(
    "/contacts/create-contact",
    payload
  );
  return data;
};

// 2. Get All Messages (Admin)
export const getAllContacts = async () => {
  const { data } = await axiosInstance.get("/contacts");
  return data;
};

// 3. Delete Message (Admin)
export const deleteContact = async (id: string) => {
  const { data } = await axiosInstance.delete(`/contacts/${id}`);
  return data;
};

// 4. Mark as Read (Admin)
export const markAsRead = async (id: string) => {
  const { data } = await axiosInstance.patch(`/contacts/${id}/read`, {});
  return data;
};
