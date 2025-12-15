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
  FileText,
} from "lucide-react";
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
} from "@/components/ui/card";
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

  console.log("blog==>", blog);

  if (loading)
    return <div className="p-10 text-center text-lg">Loading Blog Post...</div>;

  if (error || !blog)
    return (
      <div className="p-10 text-center text-red-600 text-lg">
        Error: {error || "Blog post not found."}
      </div>
    );

  const getCategoryBadge = (category: IBlog["category"]) => {
    const baseStyle = "font-medium capitalize text-xs px-2 py-0.5 rounded-full";
    switch (category) {
      case "News":
        return (
          <Badge
            className={`bg-blue-50 text-blue-700 ${baseStyle}`}
            variant="secondary">
            {category}
          </Badge>
        );
      case "Event":
        return (
          <Badge
            className={`bg-purple-50 text-purple-700 ${baseStyle}`}
            variant="secondary">
            {category}
          </Badge>
        );
      case "Tips":
        return (
          <Badge
            className={`bg-green-50 text-green-700 ${baseStyle}`}
            variant="secondary">
            {category}
          </Badge>
        );
      case "Stories":
        return (
          <Badge
            className={`bg-orange-50 text-orange-700 ${baseStyle}`}
            variant="secondary">
            {category}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className={baseStyle}>
            {category}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      {/* 1. Header and Actions (Sticky for ease of navigation) */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b py-3 flex justify-between items-center px-2 -mx-2">
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
                : "text-gray-600 border"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Main Content & Header (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Header Section */}
          <header className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
              {getCategoryBadge(blog.category)}
              <span className="flex items-center gap-1">
                <User className="h-4 w-4 text-gray-400" />
                By <strong>{blog.author}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
              </span>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {blog.title}
            </h1>
          </header>

          {/* Cover Image */}
          <div className="relative h-112.5 w-full rounded-xl overflow-hidden shadow-xl bg-gray-100">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Cover Image Available
              </div>
            )}
          </div>

          {/* Rich Content Render */}
          <Card className="shadow-lg border-t-4 border-black">
            <CardContent className="p-8">
              <div
                className="prose max-w-none prose-lg text-gray-800 break-words prose-a:text-blue-600 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>
        </div>

        {/* 3. Metadata Sidebar Card (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md sticky top-20 bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Post Metadata</CardTitle>
              <CardDescription>
                Publication details for administrative review.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Publication Status */}
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-black" /> Publication
                  Status
                </span>
                {blog.isPublished ? (
                  <Badge className="bg-green-50 text-green-700 font-bold gap-1 text-sm">
                    LIVE
                  </Badge>
                ) : (
                  <Badge className="bg-red-50 text-red-700 font-bold gap-1 text-sm">
                    DRAFT
                  </Badge>
                )}
              </div>

              {/* Creation Date */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Created On:</span>
                </div>
                <p className="text-sm pl-6 text-gray-800">
                  {formatDate(blog.createdAt)}
                </p>
              </div>

              {/* Last Updated Date */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Last Modified:</span>
                </div>
                <p className="text-sm pl-6 text-gray-800">
                  {formatDate(blog.updatedAt)}
                </p>
              </div>

              {/* Quick Edit Button */}
              <Button
                onClick={() =>
                  router.push(`/admin/dashboard/blogs/edit/${blog._id}`)
                }
                className="w-full mt-4 gap-2 bg-black hover:bg-gray-800">
                <Edit className="h-4 w-4" /> Jump to Editor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
