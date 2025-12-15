export type TProductCategory =
  | "Plush"
  | "Plastic"
  | "Educational"
  | "Electronic"
  | "Wooden"
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
