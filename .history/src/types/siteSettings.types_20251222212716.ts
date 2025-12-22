export interface ISiteSetting {
  _id?: string;
  siteName: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    pinterest?: string;
    reddit?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
