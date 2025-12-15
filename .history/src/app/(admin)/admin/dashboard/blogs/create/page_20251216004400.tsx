"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSelect from "@/components/core/GSLForm/GSLSelect";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";
import GSLRichTextEditor from "@/components/core/GSLForm/GSLRichTextEditor";
import { createBlog } from "@/services/BlogService";
import { TBlogCategory } from "@/types/blog.types";

const categoryOptions: { label: string; value: TBlogCategory }[] = [
  { label: "News", value: "News" },
  { label: "Event", value: "Event" },
  { label: "Tips", value: "Tips" },
  { label: "Stories", value: "Stories" },
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  category: z.enum(["News", "Event", "Tips", "Stories"]),
  content: z.string().min(50, "Content must be at least 50 characters long"),
  coverImage: z
    .any()
    .refine((file) => file instanceof File, "Cover image is required"),
});

export default function CreateBlogPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "News" as TBlogCategory,
      content: "",
      coverImage: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Creating blog post...");

    try {
      const formData = new FormData();

      // 1. JSON Data (Title, Content, etc.)
      const blogData = {
        title: values.title,
        content: values.content, // HTML String
        category: values.category,
        author: values.author,
        isPublished: true, // Default to published on creation
      };
      formData.append("data", JSON.stringify(blogData));

      // 2. File (Key must be 'coverImage' based on backend)
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }

      const res = await createBlog(formData);

      if (res.success) {
        toast.success("Blog post created successfully!", { id: toastId });
        router.push("/admin/dashboard/blogs");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create blog post", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Blog List
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Write New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            {/* Title, Author, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GSLInput
                name="title"
                label="Title"
                placeholder="e.g. New Product Launch"
              />
              <GSLInput
                name="author"
                label="Author Name"
                placeholder="e.g. GSL Team"
              />
              <GSLSelect
                name="category"
                label="Category"
                placeholder="Select category"
                options={categoryOptions}
              />
            </div>

            <GSLSingleImageUpload
              name="coverImage"
              label="Cover Image"
            />

            <GSLRichTextEditor
              name="content"
              label="Blog Content"
              placeholder="Start writing your article here..."
            />

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black text-white">
                Publish Post
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
