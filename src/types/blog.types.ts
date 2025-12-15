export type TBlogCategory = "News" | "Event" | "Tips" | "Stories";

export interface IBlog {
  _id: string;
  title: string;
  content: string; // HTML string
  coverImage: string; // URL
  category: TBlogCategory;
  author: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
