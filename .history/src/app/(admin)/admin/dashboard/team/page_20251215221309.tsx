"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  Edit,
  Plus,
  Trash,
  Eye,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { GSLTable } from "@/components/core/GSLTable/GSLTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllTeamMembers, deleteTeamMember } from "@/services/TeamService";
import { ITeam } from "@/types/team.types";

export default function TeamListPage() {
  const [team, setTeam] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 🔍 Query State
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      // Backend uses QueryBuilder, so we pass these params
      const query = { searchTerm, page, limit, sort: "displayOrder" };

      const res = await getAllTeamMembers(); // Update service to accept query if needed, currently fetching all
      // Note: If you updated getAllTeamMembers to accept query, pass it here: getAllTeamMembers(query)

      // Since your provided backend service code was simple 'getAll',
      // I assume we are filtering on frontend OR you updated the service to pass query params.
      // For now, let's assume we fetch all and filter/paginate on frontend to be safe with "Backend same" rule.
      // IF you updated the service to pass params, uncomment query passing.

      if (res.success) {
        let data = res.data;

        // Frontend Search (since backend might just return all)
        if (searchTerm) {
          data = data.filter(
            (t: ITeam) =>
              t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.designation.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Frontend Pagination Logic
        const startIndex = (page - 1) * limit;
        const slicedData = data.slice(startIndex, startIndex + limit);

        setTeam(slicedData);
        setHasMore(data.length > startIndex + limit);
      }
    } catch (error) {
      toast.error("Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm]); // Trigger on page or search change

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTeamMember(deleteId);
      toast.success("Team member removed");
      fetchTeam();
    } catch (error) {
      toast.error("Delete failed");
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
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200">
          {row.original.designation}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* 👁️ Premium View Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="h-8 w-8 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 shadow-none border border-blue-200">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 overflow-hidden border-0">
              {/* Profile Card Layout */}
              <div className="relative h-32 bg-linear-to-r from-blue-600 to-purple-600">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                  {row.original.photo ? (
                    <Image
                      src={row.original.photo}
                      alt={row.original.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200" />
                  )}
                </div>
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {row.original.name}
                </h2>
                <p className="text-blue-600 font-medium mb-4">
                  {row.original.designation}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {row.original.bio ||
                    "No biography available for this team member."}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {row.original.socialLinks?.linkedin && (
                    <Link
                      href={row.original.socialLinks.linkedin}
                      target="_blank"
                      className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  )}
                  {row.original.socialLinks?.twitter && (
                    <Link
                      href={row.original.socialLinks.twitter}
                      target="_blank"
                      className="p-2 bg-gray-100 rounded-full hover:bg-sky-100 hover:text-sky-500 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </Link>
                  )}
                  {row.original.socialLinks?.facebook && (
                    <Link
                      href={row.original.socialLinks.facebook}
                      target="_blank"
                      className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </Link>
                  )}
                  {row.original.socialLinks?.instagram && (
                    <Link
                      href={row.original.socialLinks.instagram}
                      target="_blank"
                      className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link href={`/admin/dashboard/team/edit/${row.original._id}`}>
            <Button
              size="icon"
              className="h-8 w-8 bg-orange-100 text-orange-600 hover:bg-orange-200 border border-orange-200">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="icon"
            className="h-8 w-8 bg-red-100 text-red-600 hover:bg-red-200 border border-red-200"
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

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name or role..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <GSLTable
          columns={columns}
          data={team}
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
        <p className="text-sm text-gray-500">Page {page}</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}>
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
