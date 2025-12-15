"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Edit, Calendar, User, Globe } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      {/* Header and Actions */}
      <div className="flex justify-between items-center pb-4 border-b">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/dashboard/blogs")}
          className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to List
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/admin/dashboard/blogs/edit/${blog._id}`)
            }
            className="gap-2">
            <Edit className="h-4 w-4" /> Edit Post
          </Button>
          {blog.isPublished ? (
            <Button
              variant="default"
              className="gap-2 bg-green-600 hover:bg-green-700">
              <Globe className="h-4 w-4" /> Live
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="gap-2 text-gray-600"
              disabled>
              <FileText className="h-4 w-4" /> Draft
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="shadow-lg">
        <div className="relative h-96 w-full rounded-t-lg overflow-hidden">
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

        <CardContent className="p-8 space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {getCategoryBadge(blog.category)}
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(blog.createdAt), "MMMM dd, yyyy")}</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            {blog.title}
          </h1>

          {/* ⚠️ DANGEROUSLY SET INNER HTML - REQUIRED FOR RICH TEXT */}
          <div
            className="prose max-w-none prose-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
