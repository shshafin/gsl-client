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
import GSLFileUpload from "@/components/core/GSLForm/GSLFileUpload"; // 🆕 Using new component
import { createResource } from "@/services/ResourceService";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z.any().refine((file) => file instanceof File, "PDF File is required"),
});

export default function CreateResourcePage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Uploading PDF...");

    try {
      const formData = new FormData();

      // 1. JSON Data
      const resourceData = { title: values.title };
      formData.append("data", JSON.stringify(resourceData));

      // 2. File
      formData.append("file", values.file);

      const res = await createResource(formData);

      if (res.success) {
        toast.success("Resource uploaded successfully!", { id: toastId });
        router.push("/admin/dashboard/resources");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to List
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            <GSLInput
              name="title"
              label="Document Title"
              placeholder="e.g. Annual Report 2024"
            />

            <GSLFileUpload
              name="file"
              label="Upload PDF File"
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
                Upload Document
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
