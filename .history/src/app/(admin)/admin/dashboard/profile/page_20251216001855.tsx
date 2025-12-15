"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getSingleUser, updateUser } from "@/services/UserService"; // Reuse your existing service
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function ProfilePage() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form setup for Super Admin
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
        // we generally don't let people change email/role here easily without checks
      })
    ),
  });

  useEffect(() => {
    if (user?.userId) {
      getSingleUser(user.userId)
        .then((res) => {
          if (res.success) {
            setProfileData(res.data);
            form.reset({ name: res.data.name });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user, form]);

  const handleUpdate = async (values: any) => {
    if (!user?.userId) return;
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ name: values.name }));

      const res = await updateUser(user.userId, formData);
      if (res.success) {
        toast.success("Profile updated");
        setProfileData((prev: any) => ({ ...prev, name: values.name }));
      }
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  if (loading) return <div>Loading Profile...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="flex items-center gap-6 bg-white p-6 rounded-lg border shadow-sm">
        <Avatar className="h-24 w-24 border-4 border-gray-100">
          <AvatarImage src={profileData?.image} />
          <AvatarFallback className="text-2xl">
            {profileData?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{profileData?.name}</h2>
          <p className="text-gray-500">{profileData?.email}</p>
          <Badge className="mt-2 capitalize">
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
              className="space-y-4">
              <GSLInput
                name="name"
                label="Full Name"
              />
              {/* Add Password Change or Image Upload here if needed */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-black text-white">
                  Save Changes
                </Button>
              </div>
            </GSLForm>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
          ℹ️ As a <strong>{user?.role}</strong>, you cannot edit your profile
          details directly. Please contact a Super Admin if changes are needed.
        </div>
      )}
    </div>
  );
}
