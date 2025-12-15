import axiosInstance from "@/lib/axios";

// 1. Get All Team Members
export const getAllTeamMembers = async () => {
  const { data } = await axiosInstance.get("/team");
  return data;
};

// 2. Get Single Member
export const getSingleTeamMember = async (id: string) => {
  const { data } = await axiosInstance.get(`/team/${id}`);
  return data;
};

// 3. Create Member (Note the specific route)
export const createTeamMember = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/team/create-team", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 4. Update Member
export const updateTeamMember = async (id: string, formData: FormData) => {
  const { data } = await axiosInstance.patch(`/team/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// 5. Delete Member
export const deleteTeamMember = async (id: string) => {
  const { data } = await axiosInstance.delete(`/team/${id}`);
  return data;
};
