/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save, Globe, Share2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import GSLTextarea from "@/components/core/GSLForm/GSLTextarea";
import GSLSingleImageUpload from "@/components/core/GSLForm/GSLSingleImageUpload";
import { getSiteSettings } from "@/services/SiteSettingService";


// Validation Schema
const formSchema = z.object({
  siteName: z.string().min(1, "Site Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  // Social Links (Optional)
  socialLinks: z.object({
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    pinterest: z.string().optional(),
    reddit: z.string().optional(),
  }),
  logo: z.any().optional(),
});

export default function SiteSettingsPage() {
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      email: "",
      phone: "",
      address: "",
      socialLinks: {
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        tiktok: "",
        pinterest: "",
        reddit: "",
      },
      logo: undefined,
    },
  });

  // Fetch Data on Load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSiteSettings();
        if (res.success && res.data) {
          const data = res.data;

          // Populate Form
          form.reset({
            siteName: data.siteName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            socialLinks: {
              facebook: data.socialLinks?.facebook || "",
              linkedin: data.socialLinks?.linkedin || "",
              twitter: data.socialLinks?.twitter || "",
              instagram: data.socialLinks?.instagram || "",
              tiktok: data.socialLinks?.tiktok || "",
              pinterest: data.socialLinks?.pinterest || "",
              reddit: data.socialLinks?.reddit || "",
            },
            logo: data.logo, // Pass string URL for preview
          });
        }
      } catch (error) {
        // If 404, it just means no settings yet. That's fine.
        console.log("No settings found, creating new.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [form]);

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Saving settings...");

    try {
      const formData = new FormData();

      // 1. JSON Data
      const settingsData = {
        siteName: values.siteName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        socialLinks: values.socialLinks,
      };

      formData.append("data", JSON.stringify(settingsData));

      // 2. Logo File (Only if it's a new file)
      if (values.logo instanceof File) {
        formData.append("logo", values.logo);
      }

      const res = await updateSiteSettings(formData);

      if (res.success) {
        toast.success("Settings saved successfully!", { id: toastId });
        // Optional: Reload window to reflect logo changes in Sidebar/Header if you use it there
        // window.location.reload();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save settings", {
        id: toastId,
      });
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading configuration...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-gray-500">Manage global website configuration</p>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-black text-white hover:bg-gray-800 shadow-md">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <GSLForm
        form={form}
        onSubmit={onSubmit}
        className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Branding & Contact */}
          <div className="md:col-span-2 space-y-6">
            {/* 1. General Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" /> General
                  Information
                </CardTitle>
                <CardDescription>
                  Basic details about your website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <GSLInput
                  name="siteName"
                  label="Website Name"
                  placeholder="e.g. My Awesome Brand"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GSLInput
                    name="email"
                    label="Contact Email"
                    type="email"
                  />
                  <GSLInput
                    name="phone"
                    label="Phone Number"
                  />
                </div>
                <GSLTextarea
                  name="address"
                  label="Office Address"
                  placeholder="123 Main St, City, Country"
                />
              </CardContent>
            </Card>

            {/* 2. Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-purple-600" /> Social Media
                </CardTitle>
                <CardDescription>
                  Links to your social profiles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GSLInput
                    name="socialLinks.facebook"
                    label="Facebook URL"
                    placeholder="https://facebook.com/..."
                  />
                  <GSLInput
                    name="socialLinks.instagram"
                    label="Instagram URL"
                    placeholder="https://instagram.com/..."
                  />
                  <GSLInput
                    name="socialLinks.linkedin"
                    label="LinkedIn URL"
                    placeholder="https://linkedin.com/in/..."
                  />
                  <GSLInput
                    name="socialLinks.twitter"
                    label="Twitter / X URL"
                    placeholder="https://x.com/..."
                  />
                  <GSLInput
                    name="socialLinks.tiktok"
                    label="TikTok URL"
                    placeholder="https://tiktok.com/..."
                  />
                  <GSLInput
                    name="socialLinks.pinterest"
                    label="Pinterest URL"
                    placeholder="https://pinterest.com/..."
                  />
                  <GSLInput
                    name="socialLinks.reddit"
                    label="Reddit URL"
                    placeholder="https://reddit.com/r/..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Logo Upload */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Brand Logo
                </CardTitle>
                <CardDescription>Upload your website logo.</CardDescription>
              </CardHeader>
              <CardContent>
                <GSLSingleImageUpload
                  name="logo"
                  label="Logo Image"
                />
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Recommended size: 200x50px or Square. <br /> Transparent PNG
                  works best.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </GSLForm>
    </div>
  );
}
