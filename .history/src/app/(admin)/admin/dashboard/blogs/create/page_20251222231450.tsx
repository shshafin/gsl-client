"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSelect from "@/components/core/GSLForm/GSLSelect";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";

import { createBlog } from "@/services/BlogService";
import { TBlogCategory } from "@/types/blog.types";

// Import Quill CSS
import "react-quill/dist/quill.snow.css";

// Dynamic Import for the Editor
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-50 animate-pulse border rounded-lg flex items-center justify-center text-gray-400">
      Loading Natural Editor...
    </div>
  ),
});

const categoryOptions: { label: string; value: TBlogCategory }[] = [
  { label: "News", value: "News" },
  { label: "Event", value: "Event" },
  { label: "Tips", value: "Tips" },
  { label: "Stories", value: "Stories" },
];

// Professional Toolbar Configuration
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote", "code-block"],
    ["clean"],
  ],
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  category: z.enum(["News", "Event", "Tips", "Stories"]),
  content: z.string().min(20, "Content must be at least 20 characters"),
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
    const toastId = toast.loading("Publishing your innovation...");

    try {
      const formData = new FormData();
      const blogData = {
        title: values.title,
        content: values.content, // Raw HTML from Quill
        category: values.category,
        author: values.author,
        isPublished: true,
      };

      formData.append("data", JSON.stringify(blogData));
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }

      const res = await createBlog(formData);

      if (res.success) {
        toast.success("Blog published successfully!", { id: toastId });
        router.push("/admin/dashboard/blogs");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2 border-gray-200">
        <ArrowLeft className="h-4 w-4" /> Back to List
      </Button>

      <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-gray-900 text-white p-8">
          <CardTitle className="text-3xl font-black tracking-tight">
            Write New Innovation Story
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Share the latest updates from GSL Export
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GSLInput
                name="title"
                label="Article Title"
                placeholder="e.g. Scaling Quality"
              />
              <GSLInput
                name="author"
                label="Author"
                placeholder="e.g. Shafin"
              />
              <GSLSelect
                name="category"
                label="Category"
                options={categoryOptions}
              />
            </div>

            <GSLSingleImageUpload
              name="coverImage"
              label="Featured Image"
            />

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                Blog Content
              </label>
              {/* Using Controller for clean integration with React Quill */}
              <Controller
                name="content"
                control={form.control}
                render={({ field }) => (
                  <div className="prose-editor">
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      modules={quillModules}
                      className="bg-white rounded-xl h-80 mb-12"
                      placeholder="Start typing your full stack story..."
                    />
                  </div>
                )}
              />
              {form.formState.errors.content && (
                <p className="text-xs text-red-500 font-bold mt-2">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-10 border-t border-gray-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="font-bold">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-red hover:bg-red-700 text-white px-10 h-12 rounded-xl font-black shadow-xl shadow-red-100 transition-all">
                Publish Article
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
