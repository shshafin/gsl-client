export type TProductCategory =
  | "Soft Toy"
  | "Pet Toy"
  | "Baby Accessories"
  | "Others";

export interface IProduct {
  _id: string;
  name: string;
  category: TProductCategory;
  images: string[];
  description: string;
  price?: number; // Optional in your schema
  isFeatured: boolean; // Important for Home Page Slider
  createdAt: string;
  updatedAt: string;
}
