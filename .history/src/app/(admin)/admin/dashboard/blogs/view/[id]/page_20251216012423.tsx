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
        if (res.success) setBlog(res.data);
        else setError("Blog post not found.");
      } catch {
        setError("Failed to load blog post.");
        toast.error("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading blog post...
      </div>
    );

  if (error || !blog)
    return (
      <div className="py-20 text-center text-red-600">
        {error || "Blog not found"}
      </div>
    );

  const formatDate = (date: string) =>
    format(new Date(date), "MMM dd, yyyy 'at' hh:mm a");

  const categoryBadge = () => {
    const base = "px-3 py-1 text-xs rounded-full font-medium";
    switch (blog.category) {
      case "News":
        return (
          <Badge className={`${base} bg-blue-100 text-blue-700`}>News</Badge>
        );
      case "Event":
        return (
          <Badge className={`${base} bg-purple-100 text-purple-700`}>
            Event
          </Badge>
        );
      case "Tips":
        return (
          <Badge className={`${base} bg-green-100 text-green-700`}>Tips</Badge>
        );
      case "Stories":
        return (
          <Badge className={`${base} bg-orange-100 text-orange-700`}>
            Stories
          </Badge>
        );
      default:
        return <Badge className={base}>{blog.category}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Top Actions (NOT STICKY) */}
      <div className="flex flex-wrap gap-3 justify-between items-center border-b pb-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push("/admin/dashboard/blogs")}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() =>
              router.push(`/admin/dashboard/blogs/edit/${blog._id}`)
            }>
            <Edit className="w-4 h-4" /> Edit
          </Button>

          <Button
            disabled
            className={`gap-2 ${
              blog.isPublished
                ? "bg-green-600 hover:bg-green-600"
                : "bg-gray-200 text-gray-700"
            }`}>
            {blog.isPublished ? (
              <>
                <Globe className="w-4 h-4" /> Published
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" /> Draft
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {categoryBadge()}
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {blog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              {blog.title}
            </h1>
          </header>

          {/* Cover Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No cover image
              </div>
            )}
          </div>

          {/* Content */}
          <Card className="rounded-2xl shadow-xl">
            <CardContent className="p-8 lg:p-10">
              <div
                className="
                  prose 
                  prose-lg 
                  max-w-none
                  prose-headings:font-bold
                  prose-img:rounded-xl
                  prose-a:text-blue-600
                  prose-blockquote:border-l-4
                  prose-blockquote:border-black
                  prose-blockquote:bg-gray-50
                  prose-blockquote:pl-6
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Post Metadata</CardTitle>
              <CardDescription>
                Administrative details & timestamps
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="flex items-center gap-2 font-medium text-gray-600">
                  <CheckCircle className="w-4 h-4" /> Status
                </span>
                <Badge
                  className={
                    blog.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }>
                  {blog.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Created
                </p>
                <p className="text-sm font-medium pl-6">
                  {formatDate(blog.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Last Updated
                </p>
                <p className="text-sm font-medium pl-6">
                  {formatDate(blog.updatedAt)}
                </p>
              </div>

              <Button
                className="w-full gap-2 bg-black hover:bg-gray-800"
                onClick={() =>
                  router.push(`/admin/dashboard/blogs/edit/${blog._id}`)
                }>
                <Edit className="w-4 h-4" /> Open Editor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
