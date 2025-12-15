"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  Edit,
  Plus,
  Trash,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
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

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllTeamMembers, deleteTeamMember } from "@/services/TeamService";
import { ITeam } from "@/types/team.types";

export default function TeamListPage() {
  const [team, setTeam] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchTeam = async () => {
    try {
      const res = await getAllTeamMembers();
      if (res.success) {
        // Optional: Sort by displayOrder on frontend if backend doesn't
        const sortedData = res.data.sort(
          (a: ITeam, b: ITeam) =>
            (a.displayOrder || 99) - (b.displayOrder || 99)
        );
        setTeam(sortedData);
      }
    } catch (error) {
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTeamMember(deleteId);
      toast.success("Team member removed");
      fetchTeam();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<ITeam>[] = [
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => (
        <div className="h-12 w-12 relative rounded-full border overflow-hidden bg-gray-50">
          {row.original.photo ? (
            <Image
              src={row.original.photo}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
              N/A
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-700">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "designation",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.designation}</Badge>
      ),
    },
    {
      accessorKey: "socialLinks",
      header: "Socials",
      cell: ({ row }) => {
        const links = row.original.socialLinks;
        return (
          <div className="flex gap-2 text-gray-400">
            {links?.linkedin && <Linkedin className="h-4 w-4 text-blue-600" />}
            {links?.twitter && <Twitter className="h-4 w-4 text-sky-400" />}
            {links?.facebook && <Facebook className="h-4 w-4 text-blue-800" />}
            {links?.instagram && (
              <Instagram className="h-4 w-4 text-pink-600" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "displayOrder",
      header: "Order",
      cell: ({ row }) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
          {row.original.displayOrder || "-"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/dashboard/team/edit/${row.original._id}`}>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8"
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
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-gray-500">Manage your organization&apos;s staff</p>
        </div>
        <Link href="/admin/dashboard/team/create">
          <Button className="bg-black text-white hover:bg-gray-800 shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        </Link>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={team}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will remove the member from
              your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
