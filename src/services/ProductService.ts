import axiosInstance from "@/lib/axios";

// 1. Get All Products
export const getAllProducts = async (query?: Record<string, any>) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) params.append("searchTerm", query.searchTerm);
  if (query?.category && query.category !== "all")
    params.append("category", query.category);
  if (query?.sort) params.append("sort", query.sort);
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());

  // Backend should return { success: true, meta: { page, total, totalPage }, data: [...] }
  const { data } = await axiosInstance.get(`/products?${params.toString()}`);
  return data;
};

// 2. Get Single Product
export const getSingleProduct = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

// 3. Create Product (Must use FormData for images)
export const createProduct = async (productData: FormData) => {
  const { data } = await axiosInstance.post(
    "/products/create-product",
    productData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

// 4. Update Product
export const updateProduct = async (id: string, productData: FormData) => {
  const { data } = await axiosInstance.patch(`/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 5. Delete Product
export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
