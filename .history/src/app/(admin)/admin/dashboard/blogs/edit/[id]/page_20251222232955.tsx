/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSelect from "@/components/core/GSLForm/GSLSelect";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";
import GSLCheckbox from "@/components/core/GSLForm/GSLCheckbox";

import { getSingleBlog, updateBlog } from "@/services/BlogService";
import { TBlogCategory } from "@/types/blog.types";

// ✅ Import react-quill-new CSS
import "react-quill-new/dist/quill.snow.css";

// ✅ Dynamic Import for react-quill-new
const ReactQuill = dynamic(() => import("react-quill-new"), {
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
  content: z.string().min(20, "Content is too short"),
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
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4">
        <Loader2
          className="animate-spin text-brand-red"
          size={40}
        />
        Loading Blog Post...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2 border-gray-200">
        <ArrowLeft className="h-4 w-4" /> Back to Blog List
      </Button>

      <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-gray-900 text-white p-8">
          <CardTitle className="text-3xl font-black tracking-tight">
            Edit Innovation Story
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Modify your published content
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <GSLInput
                  name="title"
                  label="Title"
                  placeholder="e.g. New Product Launch"
                />
              </div>

              <GSLInput
                name="author"
                label="Author Name"
                placeholder="e.g. GSL Team"
              />
              <GSLSelect
                name="category"
                label="Category"
                options={categoryOptions}
              />
            </div>

            <GSLSingleImageUpload
              name="coverImage"
              label="Update Cover Image"
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                  Blog Content
                </label>
                <GSLCheckbox
                  name="isPublished"
                  label="Publish Status"
                />
              </div>

              {/* ✅ Integrated react-quill-new using Controller */}
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
                      placeholder="Continue writing your full stack story..."
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
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
