"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react"; // 🆕 Added Clock, CheckCircle
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // 🆕 Added CardTitle, CardDescription
import { getSingleBlog } from "@/services/BlogService";
import { IBlog } from "@/types/blog.types";

export default function BlogViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id);
        if (res.success) {
          setBlog(res.data);
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        setError("Failed to load blog post details.");
        toast.error("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center text-lg">Loading Blog Post...</div>;

  if (error || !blog)
    return (
      <div className="p-10 text-center text-red-600 text-lg">
        Error: {error || "Blog post not found."}
      </div>
    );

  const getCategoryBadge = (category: IBlog["category"]) => {
    switch (category) {
      case "News":
        return (
          <Badge
            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            variant="secondary">
            {category}
          </Badge>
        );
      case "Event":
        return (
          <Badge
            className="bg-purple-100 text-purple-700 hover:bg-purple-200"
            variant="secondary">
            {category}
          </Badge>
        );
      case "Tips":
        return (
          <Badge
            className="bg-green-100 text-green-700 hover:bg-green-200"
            variant="secondary">
            {category}
          </Badge>
        );
      case "Stories":
        return (
          <Badge
            className="bg-orange-100 text-orange-700 hover:bg-orange-200"
            variant="secondary">
            {category}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 1. Header and Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/dashboard/blogs")}
          className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog List
        </Button>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/admin/dashboard/blogs/edit/${blog._id}`)
            }
            className="gap-2">
            <Edit className="h-4 w-4" /> Edit Post
          </Button>
          <Button
            variant={blog.isPublished ? "default" : "secondary"}
            className={`gap-2 ${
              blog.isPublished
                ? "bg-green-600 hover:bg-green-700"
                : "text-gray-600"
            }`}
            disabled>
            {blog.isPublished ? (
              <Globe className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            {blog.isPublished ? "Published (Live)" : "Status: Draft"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Main Content Card (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            {/* Cover Image */}
            <div className="relative h-96 w-full rounded-t-lg overflow-hidden bg-gray-100">
              {blog.coverImage && (
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                />
              )}
            </div>

            <CardContent className="p-8 space-y-8">
              {/* Title and Metadata */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {getCategoryBadge(blog.category)}
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>
                      Author: <strong>{blog.author}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Published: {formatDate(blog.createdAt)}</span>
                  </div>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                  {blog.title}
                </h1>
              </div>

              <div className="w-full h-px bg-gray-200"></div>

              {/* Rich Content Render */}
              <div
                className="prose max-w-none prose-lg text-gray-800 break-words"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>
        </div>

        {/* 3. Metadata Sidebar Card (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Post Information</CardTitle>
              <CardDescription>
                Key details about the publication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Publication Status */}
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600 font-medium">Status</span>
                {blog.isPublished ? (
                  <Badge className="bg-green-100 text-green-700 font-bold gap-1">
                    <CheckCircle className="h-4 w-4" /> Published
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 font-bold gap-1">
                    <FileText className="h-4 w-4" /> Draft
                  </Badge>
                )}
              </div>

              {/* Category */}
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600 font-medium">Category</span>
                {getCategoryBadge(blog.category)}
              </div>

              {/* Creation Date */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Created At:</span>
                </div>
                <p className="text-sm pl-6 text-gray-800">
                  {formatDate(blog.createdAt)}
                </p>
              </div>

              {/* Last Updated Date */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Last Updated:</span>
                </div>
                <p className="text-sm pl-6 text-gray-800">
                  {formatDate(blog.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>{" "}
      {/* End Grid */}
    </div>
  );
}
