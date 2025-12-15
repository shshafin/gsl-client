import axiosInstance from "@/lib/axios";

// 1. Get All Blogs
export const getAllBlogs = async () => {
  const { data } = await axiosInstance.get("/blogs");
  return data;
};

// 2. Get Single Blog
export const getSingleBlog = async (id: string) => {
  const { data } = await axiosInstance.get(`/blogs/${id}`);
  return data;
};

// 3. Create Blog (Uses FormData for coverImage)
export const createBlog = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/blogs/create-blog", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 4. Update Blog (Uses FormData for coverImage and potentially other fields)
export const updateBlog = async (id: string, formData: FormData) => {
  const { data } = await axiosInstance.patch(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 5. Delete Blog
export const deleteBlog = async (id: string) => {
  const { data } = await axiosInstance.delete(`/blogs/${id}`);
  return data;
};
