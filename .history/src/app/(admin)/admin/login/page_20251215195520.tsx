"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Importing our Reusable Core Components
import GSLForm from "@/components/core/GSLForm/GSLForm";
import GSLInput from "@/components/core/GSLForm/GSLInput";
import { loginAdmin } from "@/services/AuthService";

// 1. Validation Schema (Zod)
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLogin() {
  const router = useRouter();

  // 2. Setup Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Handle Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const toastId = toast.loading("Logging in...");

      const result = await loginAdmin(values);

      if (result.success) {
        // Save token to cookies (expires in 1 day or matching backend)
        setCookie("accessToken", result.data.accessToken, {
          maxAge: 60 * 60 * 24,
        });

        toast.success("Welcome back, Admin!", { id: toastId });

        // Redirect to Dashboard
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed", {
        duration: 2000,
      });
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
          {/* 👇 Our Reusable Form */}
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
              type="password"
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
