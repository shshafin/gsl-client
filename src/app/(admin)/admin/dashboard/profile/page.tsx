"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getSingleUser, updateUser } from "@/services/UserService";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function ProfilePage() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🛠️ Updated Schema: Email is now required and validated
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"), // 🆕 Added Email
        image: z.any().optional(),
      })
    ),
    defaultValues: {
      name: "",
      email: "", // 🆕 Default
      image: undefined,
    },
  });

  useEffect(() => {
    if (user?.userId) {
      getSingleUser(user.userId)
        .then((res) => {
          if (res.success) {
            setProfileData(res.data);
            // Reset form with all data
            form.reset({
              name: res.data.name,
              email: res.data.email, // 🆕 Pre-fill email
              image: res.data.image,
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user, form]);

  const handleUpdate = async (values: any) => {
    if (!user?.userId) return;
    const toastId = toast.loading("Updating profile...");

    try {
      const formData = new FormData();

      // 1. Send JSON data (Name AND Email)
      formData.append(
        "data",
        JSON.stringify({
          name: values.name,
          email: values.email, // 🆕 Send new email
        })
      );

      // 2. Send File
      if (values.image instanceof File) {
        formData.append("file", values.image);
      }

      const res = await updateUser(user.userId, formData);

      if (res.success) {
        toast.success("Profile updated successfully", { id: toastId });

        setProfileData((prev: any) => ({
          ...prev,
          name: values.name,
          email: values.email, // 🆕 Update local state
          image: res.data?.image || prev.image,
        }));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update", {
        id: toastId,
      });
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* Profile Overview Card */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-lg border shadow-sm">
        <Avatar className="h-24 w-24 border-4 border-gray-100">
          <AvatarImage
            src={profileData?.image}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl bg-black text-white">
            {profileData?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {profileData?.name}
          </h2>
          <p className="text-gray-500">{profileData?.email}</p>
          <Badge className="mt-2 capitalize bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">
            {profileData?.role?.replace("_", " ")}
          </Badge>
        </div>
      </div>

      {user?.role === "super_admin" ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <GSLForm
              form={form}
              onSubmit={handleUpdate}
              className="space-y-6">
              <div className="w-full">
                <GSLSingleImageUpload
                  name="image"
                  label="Change Profile Picture"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GSLInput
                  name="name"
                  label="Full Name"
                />

                {/* 🆕 Editable Email Input */}
                <GSLInput
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800">
                  Save Changes
                </Button>
              </div>
            </GSLForm>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <div className="text-xl">ℹ️</div>
          <div className="text-sm text-blue-800">
            <p className="font-semibold">View Only Access</p>
            <p>
              As a <strong>{user?.role?.replace("_", " ")}</strong>, you cannot
              edit your profile details directly. Please contact a Super Admin
              if changes are needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
