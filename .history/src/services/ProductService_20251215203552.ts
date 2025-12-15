import axiosInstance from "@/lib/axios";

// 1. Get All Products
export const getAllProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

// 2. Get Single Product
export const getSingleProduct = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

// 3. Create Product (Must use FormData for images)
export const createProduct = async (productData: FormData) => {
  const { data } = await axiosInstance.post("/products/", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 4. Update Product
export const updateProduct = async (id: string, productData: FormData) => {
  const { data } = await axiosInstance.put(`/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 5. Delete Product
export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
