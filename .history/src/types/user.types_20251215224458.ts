export type TUserRole = "super_admin" | "admin" | "moderator";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
  image?: string;
  createdAt: string;
  updatedAt: string;
  // We do not include password here as we rarely read it back from the API
}
