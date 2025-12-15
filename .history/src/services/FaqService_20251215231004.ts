import axiosInstance from "@/lib/axios";

// 1. Get All FAQs
export const getAllFaqs = async () => {
  const { data } = await axiosInstance.get("/faqs");
  return data;
};

// 2. Create FAQ (JSON, no FormData needed)
export const createFaq = async (data: { question: string; answer: string }) => {
  const response = await axiosInstance.post("/faqs/create-faq", data);
  return response.data;
};

// 3. Delete FAQ
export const deleteFaq = async (id: string) => {
  const { data } = await axiosInstance.delete(`/faq/${id}`);
  return data;
};
