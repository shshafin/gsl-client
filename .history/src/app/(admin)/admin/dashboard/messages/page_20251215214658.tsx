"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Eye, Mail, MailOpen, Clock, Calendar } from "lucide-react";
import { format } from "date-fns"; // Standard date formatting
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import {
  getAllContacts,
  deleteContact,
  markAsRead,
} from "@/services/ContactService";
import { IContact } from "@/types/contact.types";

export default function MessagesPage() {
  const [messages, setMessages] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Track open message to mark as read
  const [viewMessage, setViewMessage] = useState<IContact | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await getAllContacts();
      // Assuming backend returns { success: true, data: [...] }
      if (res.success) {
        setMessages(res.data);
      }
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle Mark as Read
  const handleViewMessage = async (msg: IContact) => {
    setViewMessage(msg);

    // Only verify with backend if it's currently unread
    if (!msg.isRead) {
      try {
        await markAsRead(msg._id);

        // Update local state instantly (Optimistic UI)
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
      } catch (err) {
        console.error("Failed to mark as read");
      }
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteContact(deleteId);
      toast.success("Message deleted");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<IContact>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.isRead ? (
            <MailOpen className="h-5 w-5 text-gray-400" />
          ) : (
            <Badge className="bg-blue-600 hover:bg-blue-700 animate-pulse">
              New
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Sender",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span
            className={`font-medium ${
              !row.original.isRead ? "text-black font-bold" : "text-gray-600"
            }`}>
            {row.original.name}
          </span>
          <span className="text-xs text-gray-400">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <span
          className={
            !row.original.isRead ? "font-bold text-gray-900" : "text-gray-600"
          }>
          {row.original.subject}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        // Requires date-fns: npm install date-fns
        return (
          <span className="text-xs text-gray-500">
            {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* View Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                onClick={() => handleViewMessage(row.original)}>
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Message Details
                </DialogTitle>
              </DialogHeader>

              {viewMessage && (
                <div className="space-y-6 py-4">
                  {/* Header Info */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        From
                      </p>
                      <p className="font-medium text-gray-900">
                        {viewMessage.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        {viewMessage.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Received
                      </p>
                      <div className="flex items-center justify-end gap-1 text-gray-700">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">
                          {format(
                            new Date(viewMessage.createdAt),
                            "MMM dd, yyyy"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-gray-500 mt-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">
                          {format(new Date(viewMessage.createdAt), "h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subject & Body */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {viewMessage.subject}
                    </h3>
                    <div className="p-4 bg-white border rounded-md shadow-sm min-h-[150px] text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {viewMessage.message}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700"
            onClick={() => setDeleteId(row.original._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-gray-500">Read inquiries from your website</p>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
          Total: {messages.length}
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={messages}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone. Usually, you should keep messages for
              records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700">
              Delete Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
