export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  images: string[]; // Array of image URLs from Cloudinary
  createdAt: string;
  updatedAt: string;
}
