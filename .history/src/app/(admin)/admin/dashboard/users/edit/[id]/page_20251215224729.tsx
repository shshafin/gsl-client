"use client";

import { useEffect, useState, use } from "react";
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
import { getSingleUser, updateUser } from "@/services/UserService";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // Email is usually read-only or carefully validated, but we'll allow edit
  role: z.enum(["super_admin", "admin", "moderator"]),
  image: z.any().optional(),
});

export default function EditUserPage({
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
      name: "",
      role: "moderator",
      image: undefined,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getSingleUser(id);
        if (res.success) {
          const data = res.data;
          form.reset({
            name: data.name,
            role: data.role,
            image: data.image, // Pass string URL for preview
          });
        }
      } catch (error) {
        toast.error("Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, form]);

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Updating user...");

    try {
      const formData = new FormData();

      const userData = {
        name: values.name,
        role: values.role,
      };
      formData.append("data", JSON.stringify(userData));

      if (values.image instanceof File) {
        formData.append("file", values.image);
      }

      const res = await updateUser(id, formData);

      if (res.success) {
        toast.success("User updated!", { id: toastId });
        router.push("/admin/dashboard/users");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed", {
        id: toastId,
      });
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Users
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <GSLSingleImageUpload
                  name="image"
                  label="Profile Picture"
                />
              </div>

              <div className="md:col-span-2 space-y-4">
                <GSLInput
                  name="name"
                  label="Full Name"
                />

                <GSLSelect
                  name="role"
                  label="Role"
                  options={[
                    { label: "Super Admin", value: "super_admin" },
                    { label: "Admin", value: "admin" },
                    { label: "Moderator", value: "moderator" },
                  ]}
                />
              </div>
            </div>

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
                Save Changes
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
