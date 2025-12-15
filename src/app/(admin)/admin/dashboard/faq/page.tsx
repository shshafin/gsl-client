/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash, HelpCircle, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllFaqs, deleteFaq } from "@/services/FaqService";
import { IFaq } from "@/types/faq.types";

export default function FaqListPage() {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await getAllFaqs();
      if (res.success) {
        setFaqs(res.data);
      }
    } catch (error) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFaq(deleteId);
      toast.success("FAQ deleted successfully");
      fetchFaqs();
    } catch (error) {
      toast.error("Failed to delete FAQ");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<IFaq>[] = [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
          <span className="font-medium text-gray-900">
            {row.original.question}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "answer",
      header: "Answer",
      cell: ({ row }) => (
        <p
          className="text-gray-500 text-sm line-clamp-2 max-w-md"
          title={row.original.answer}>
          {row.original.answer}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <span className="text-xs text-gray-400">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setDeleteId(row.original._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              FAQ Section
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Manage common questions ({faqs.length} items)
            </p>
          </div>

          <Link
            href={faqs.length >= 5 ? "#" : "/admin/dashboard/faq/create"}
            className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 shadow-md"
              disabled={faqs.length >= 5}>
              <Plus className="mr-2 h-4 w-4" /> Add FAQ
            </Button>
          </Link>
        </div>
      </div>

      {/* ⚠️ Advisory Notice */}
      <Alert
        variant={faqs.length >= 5 ? "destructive" : "default"}
        className={`${
          faqs.length >= 5
            ? "bg-red-50 border-red-200"
            : "bg-blue-50 border-blue-200"
        }`}>
        {faqs.length >= 5 ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <Info className="h-4 w-4" />
        )}
        <AlertTitle className="font-semibold">Design Recommendation</AlertTitle>
        <AlertDescription>
          For the best website layout and user experience, we strongly recommend
          keeping the FAQ list to a <strong>maximum of 5 items</strong>.
          {faqs.length >= 5 && " You have reached the recommended limit."}
        </AlertDescription>
      </Alert>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={faqs}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ?</AlertDialogTitle>
            <AlertDialogDescription>
              This will be removed from your website immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
