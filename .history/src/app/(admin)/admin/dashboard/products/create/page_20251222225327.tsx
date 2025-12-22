/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

// Reusable Components
import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSelect from "@/components/core/GSLForm/GSLSelect";
import GSLTextarea from "@/components/core/GSLForm/GSLTextarea";
import GSLImageUpload from "@/components/core/GSLForm/GSLImageUpload";
import { createProduct } from "@/services/ProductService";
import { ArrowLeft } from "lucide-react";

// --- VALIDATION SCHEMA UPDATED ---
const formSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  isFeatured: z.boolean().default(false),
  // images is now the only required field
  images: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "At least one image is required"
    ),
});

const categories = [
  { value: "Soft Toy", label: "Soft Toy" },
  { value: "Plastic Toy", label: "Plastic Toy" },
  { value: "Baby Accessories", label: "Baby Accessories" },
  { value: "Others", label: "Others" },
];

export default function CreateProductPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      isFeatured: false,
      images: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Creating product...");

    try {
      const formData = new FormData();

      // 1. Prepare product data, handling optional number conversion
      const productData = {
        name: values.name || "Untitled Product", // Optional fallback
        category: values.category || "Others",
        description: values.description || "",
        price: values.price ? Number(values.price) : 0, // Avoid NaN if empty
        isFeatured: values.isFeatured,
      };

      // 2. Append JSON as 'data'
      formData.append("data", JSON.stringify(productData));

      // 3. Append Images (Guaranteed to exist by Zod)
      if (values.images && values.images.length > 0) {
        values.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }

      // 4. Send
      const res = await createProduct(formData);

      if (res.success) {
        toast.success("Product created successfully!", { id: toastId });
        router.push("/admin/dashboard/products");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create product", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GSLInput
                name="name"
                label="Product Name (Optional)"
                placeholder="e.g. Teddy Bear"
              />
              <GSLSelect
                name="category"
                label="Category (Optional)"
                options={categories}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GSLInput
                name="price"
                label="Price (Optional)"
                type="number"
                placeholder="20.00"
              />

              <div className="flex flex-col gap-3 mt-2">
                <label className="text-sm font-medium">Featured Product</label>
                <div className="flex items-center gap-2 border p-3 rounded-md">
                  <Checkbox
                    checked={form.watch("isFeatured")}
                    onCheckedChange={(val) =>
                      form.setValue("isFeatured", val as boolean)
                    }
                  />
                  <span className="text-sm text-gray-500">
                    Show on Home Page Slider
                  </span>
                </div>
              </div>
            </div>

            <GSLTextarea
              name="description"
              label="Description (Optional)"
              placeholder="Product details..."
            />

            {/* Required Field */}
            <GSLImageUpload
              name="images"
              label="Product Images (Required)"
              required // Adds a visual asterisk if your component supports it
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black">
                Create Product
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
