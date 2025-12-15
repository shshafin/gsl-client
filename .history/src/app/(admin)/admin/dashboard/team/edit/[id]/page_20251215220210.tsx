"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLTextarea from "@/components/core/GSLForm/GSLTextarea";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";
import { getSingleTeamMember, updateTeamMember } from "@/services/TeamService";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
  displayOrder: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  }),
  photo: z.any().optional(),
});

export default function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unlock params
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      designation: "",
      bio: "",
      displayOrder: "",
      socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "" },
      photo: undefined,
    },
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await getSingleTeamMember(id);
        if (res.success) {
          const data = res.data;
          form.reset({
            name: data.name,
            designation: data.designation,
            bio: data.bio || "",
            displayOrder: String(data.displayOrder || 0),
            socialLinks: {
              linkedin: data.socialLinks?.linkedin || "",
              twitter: data.socialLinks?.twitter || "",
              facebook: data.socialLinks?.facebook || "",
              instagram: data.socialLinks?.instagram || "",
            },
            photo: data.photo, // Pass string URL to uploader for preview
          });
        }
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, form]);

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Updating member...");

    try {
      const formData = new FormData();

      const teamData = {
        name: values.name,
        designation: values.designation,
        bio: values.bio,
        displayOrder: Number(values.displayOrder),
        socialLinks: values.socialLinks,
      };

      formData.append("data", JSON.stringify(teamData));

      // Only append if it's a new File (not the string URL)
      if (values.photo instanceof File) {
        formData.append("photo", values.photo);
      }

      const res = await updateTeamMember(id, formData);

      if (res.success) {
        toast.success("Updated successfully!", { id: toastId });
        router.push("/admin/dashboard/team");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed", {
        id: toastId,
      });
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Team
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <GSLSingleImageUpload
                  name="photo"
                  label="Profile Photo"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <GSLInput
                    name="name"
                    label="Full Name"
                    required
                  />
                  <GSLInput
                    name="designation"
                    label="Designation"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <GSLInput
                    name="displayOrder"
                    label="Display Order"
                    type="number"
                  />
                </div>
                <GSLTextarea
                  name="bio"
                  label="Biography"
                />
                <Separator className="my-4" />
                <h3 className="font-semibold text-gray-700">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.linkedin"
                      label="LinkedIn"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.twitter"
                      label="Twitter / X"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.facebook"
                      label="Facebook"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.instagram"
                      label="Instagram"
                      className="pl-10"
                    />
                  </div>
                </div>
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
                Update Member
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
