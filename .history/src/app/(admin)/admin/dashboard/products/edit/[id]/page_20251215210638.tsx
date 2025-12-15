/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSelect from "@/components/core/GSLForm/GSLSelect";
import GSLTextarea from "@/components/core/GSLForm/GSLTextarea";
import GSLImageUpload from "@/components/core/GSLForm/GSLImageUpload";
import { getSingleProduct, updateProduct } from "@/services/ProductService";

// Validation Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().optional(),
  isFeatured: z.boolean().default(false),
  images: z.any().optional(),
});

const categories = [
  { value: "Plush", label: "Plush" },
  { value: "Plastic", label: "Plastic" },
  { value: "Educational", label: "Educational" },
  { value: "Electronic", label: "Electronic" },
  { value: "Wooden", label: "Wooden" },
  { value: "Others", label: "Others" },
];

// 🛠️ IMPORTANT FIX: Ensure params are handled correctly
export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Capture ID securely
  const productId = params?.id;

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

  // 1. Fetch Existing Data
  useEffect(() => {
    // Safety check for ID
    if (!productId) {
      toast.error("Invalid Product ID");
      router.push("/admin/dashboard/products");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await getSingleProduct(productId);
        if (res.success) {
          const data = res.data;
          form.reset({
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price ? String(data.price) : "",
            isFeatured: data.isFeatured,
          });
          setExistingImages(data.images || []);
        }
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, form, router]);

  // 2. Handle Update
  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Updating product...");

    try {
      const formData = new FormData();

      const productData = {
        name: values.name,
        category: values.category,
        description: values.description,
        price: Number(values.price),
        isFeatured: values.isFeatured,
      };

      formData.append("data", JSON.stringify(productData));

      if (values.images && values.images.length > 0) {
        values.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }

      // Use the verified productId here
      const res = await updateProduct(productId, formData);

      if (res.success) {
        toast.success("Product updated successfully!", { id: toastId });
        router.push("/admin/dashboard/products");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update", {
        id: toastId,
      });
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading product data...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GSLInput
                name="name"
                label="Product Name"
                required
              />
              <GSLSelect
                name="category"
                label="Category"
                options={categories}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GSLInput
                name="price"
                label="Price"
                type="number"
              />
              <div className="flex flex-col gap-3 mt-2">
                <label className="text-sm font-medium">Featured Status</label>
                <div className="flex items-center gap-2 border p-3 rounded-md">
                  <Checkbox
                    checked={form.watch("isFeatured")}
                    onCheckedChange={(val) =>
                      form.setValue("isFeatured", val as boolean)
                    }
                  />
                  <span className="text-sm text-gray-500">
                    Show on Home Page
                  </span>
                </div>
              </div>
            </div>

            <GSLTextarea
              name="description"
              label="Description"
            />

            {existingImages.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Images</label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {existingImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 w-20 rounded-md overflow-hidden border">
                      <Image
                        src={img}
                        alt="Current"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  New uploads will be added to existing ones.
                </p>
              </div>
            )}

            <GSLImageUpload
              name="images"
              label="Upload New Images (Appends to existing)"
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
                Update Product
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
