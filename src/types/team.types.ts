export interface ITeam {
  _id: string;
  name: string;
  designation: string;
  photo: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
}
