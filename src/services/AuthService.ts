import axiosInstance from "@/lib/axios";
import { FieldValues } from "react-hook-form";

export const loginAdmin = async (userData: FieldValues) => {
  // Sending data to Backend: http://localhost:5000/api/auth/login
  const { data } = await axiosInstance.post("/auth/login", userData);
  return data;
};
