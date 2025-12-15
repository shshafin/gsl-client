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
import GSLTextarea from "@/components/core/GSLForm/GSLTextarea";
import { createFaq } from "@/services/FaqService";

const formSchema = z.object({
  question: z.string().min(5, "Question is too short"),
  answer: z.string().min(10, "Answer must be descriptive"),
});

export default function CreateFaqPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Adding FAQ...");

    try {
      const res = await createFaq(values);

      if (res.success) {
        toast.success("FAQ added successfully!", { id: toastId });
        router.push("/admin/dashboard/faq");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to List
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <GSLForm
            form={form}
            onSubmit={onSubmit}
            className="space-y-6">
            <GSLInput
              name="question"
              label="Question"
              placeholder="e.g. What is the return policy?"
            />

            <GSLTextarea
              name="answer"
              label="Answer"
              placeholder="Provide a clear and concise answer..."
              className="min-h-[150px]"
            />

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
                Save FAQ
              </Button>
            </div>
          </GSLForm>
        </CardContent>
      </Card>
    </div>
  );
}
