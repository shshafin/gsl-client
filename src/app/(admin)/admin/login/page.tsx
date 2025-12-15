"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Reusable Core Components
import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import { loginAdmin } from "@/services/AuthService";

// Validation Schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLogin() {
  const router = useRouter();

  // 1. Setup Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Handle Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Start Loading Toast and keep the ID
    const toastId = toast.loading("Logging in...");

    try {
      const result = await loginAdmin(values);

      if (result.success) {
        // Save token to cookies
        setCookie("accessToken", result.data.accessToken, {
          maxAge: 60 * 60 * 24,
        });

        // Success: Update the EXISTING toast (removes "Logging in...")
        toast.success("Login Successful!", { id: toastId });

        // Redirect to Dashboard
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      // Error: Extract specific message from backend
      // If backend sends "Password does not match", this grabs it.
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";

      // Update the EXISTING toast to Error
      toast.error(errorMessage, { id: toastId });
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-100 shadow-lg border-t-4 border-black">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            GSL Admin
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">
            Enter your credentials to access
          </p>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-4">
            <GSLInput
              name="email"
              label="Email Address"
              placeholder="admin@gsl.com"
            />

            <GSLInput
              name="password"
              label="Password"
              type="password" // The Eye icon logic is inside GSLInput component
              placeholder="••••••"
            />

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800">
              Login
            </Button>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
