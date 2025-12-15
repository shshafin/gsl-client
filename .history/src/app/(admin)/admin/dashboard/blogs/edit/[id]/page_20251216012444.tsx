"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSelect from "@/components/core/GSLForm/GSLSelect";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";
import GSLCheckbox from "@/components/core/GSLForm/GSLCheckbox";

import { getSingleBlog, updateBlog } from "@/services/BlogService";
import { TBlogCategory } from "@/types/blog.types";

// 🛠️ FIX: Dynamic Import for TinyMCE Editor (SSR: false)
import dynamic from "next/dynamic";
const DynamicTinyMCEEditor = dynamic(
  () => import("@/components/core/GSLForm/GSLTinyMCEEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] bg-gray-50 flex items-center justify-center border rounded-lg">
        Loading Rich Editor...
      </div>
    ),
  }
);

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
  isPublished: z.boolean().default(false),
  coverImage: z.any().optional(),
});

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "News" as TBlogCategory,
      content: "",
      isPublished: false,
      coverImage: undefined,
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id);
        if (res.success) {
          const data = res.data;
          form.reset({
            title: data.title,
            author: data.author,
            category: data.category,
            content: data.content,
            isPublished: data.isPublished,
            coverImage: data.coverImage,
          });
        }
      } catch (error) {
        toast.error("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, form]);

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Updating blog post...");

    try {
      const formData = new FormData();

      const blogData = {
        title: values.title,
        content: values.content,
        category: values.category,
        author: values.author,
        isPublished: values.isPublished,
      };
      formData.append("data", JSON.stringify(blogData));

      if (values.coverImage instanceof File) {
        formData.append("coverImage", values.coverImage);
      }

      const res = await updateBlog(id, formData);

      if (res.success) {
        toast.success("Blog post updated successfully!", { id: toastId });
        router.push("/admin/dashboard/blogs");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update blog post", {
        id: toastId,
      });
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Blog Post...</div>;

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
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="flex items-end h-full pt-8">
                <GSLCheckbox
                  name="isPublished"
                  label="Publish Post Now"
                />
              </div>
            </div>

            <GSLSingleImageUpload
              name="coverImage"
              label="Update Cover Image"
            />

            {/* 🚀 TinyMCE Editor Usage */}
            <DynamicTinyMCEEditor
              name="content"
              label="Blog Content"
              placeholder="Continue writing your article here..."
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
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
