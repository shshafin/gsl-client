"use client";

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
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload"; // 🆕
import { createTeamMember } from "@/services/TeamService";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
  displayOrder: z.string().optional(), // Input is string, convert to number
  // Nested Object for Socials
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  }),
  photo: z.any().optional(),
});

export default function CreateTeamPage() {
  const router = useRouter();

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

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Adding team member...");

    try {
      const formData = new FormData();

      // 1. Pack Text Data
      const teamData = {
        name: values.name,
        designation: values.designation,
        bio: values.bio,
        displayOrder: Number(values.displayOrder) || 0,
        socialLinks: values.socialLinks,
      };

      formData.append("data", JSON.stringify(teamData));

      // 2. Append Photo (Single)
      if (values.photo) {
        formData.append("photo", values.photo);
      }

      // 3. Send
      const res = await createTeamMember(formData);

      if (res.success) {
        toast.success("Team member added!", { id: toastId });
        router.push("/admin/dashboard/team");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create", {
        id: toastId,
      });
    }
  };

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
          <CardTitle>Add Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Photo */}
              <div className="md:col-span-1">
                <GSLSingleImageUpload
                  name="photo"
                  label="Profile Photo"
                />
              </div>

              {/* Right Column: Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <GSLInput
                    name="name"
                    label="Full Name"
                    placeholder="e.g. John Doe"
                    required
                  />
                  <GSLInput
                    name="designation"
                    label="Designation"
                    placeholder="e.g. CEO"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <GSLInput
                    name="displayOrder"
                    label="Display Order (Optional)"
                    type="number"
                    placeholder="1"
                  />
                </div>

                <GSLTextarea
                  name="bio"
                  label="Short Biography"
                  placeholder="Tell us about them..."
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
                      placeholder="https://..."
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.twitter"
                      label="Twitter / X"
                      placeholder="https://..."
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.facebook"
                      label="Facebook"
                      placeholder="https://..."
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <GSLInput
                      name="socialLinks.instagram"
                      label="Instagram"
                      placeholder="https://..."
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
                Add Member
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
