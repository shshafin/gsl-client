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
import { createUser } from "@/services/UserService";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["super_admin", "admin", "moderator"]),
  image: z.any().optional(),
});

export default function CreateUserPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "moderator",
      image: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Creating user...");

    try {
      const formData = new FormData();

      // 1. JSON Data
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };
      formData.append("data", JSON.stringify(userData));

      // 2. File (Key must be 'file' based on backend)
      if (values.image) {
        formData.append("file", values.image);
      }

      const res = await createUser(formData);

      if (res.success) {
        toast.success("User created successfully!", { id: toastId });
        router.push("/admin/dashboard/users");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create user", {
        id: toastId,
      });
    }
  };

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
          <CardTitle>Create New User</CardTitle>
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
                  placeholder="John Doe"
                />
                <GSLInput
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                />
                <GSLInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <GSLSelect
                  name="role"
                  label="Role"
                  placeholder="Select a role"
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
                Create User
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
