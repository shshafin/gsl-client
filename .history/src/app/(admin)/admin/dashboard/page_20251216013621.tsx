"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Users,
  Mail,
  CheckCircle,
  PenTool,
  GitCommit,
  FileText as ResourceIcon,
  User as UserIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getAllProducts } from "@/services/ProductService";
import { getAllContacts } from "@/services/ContactService";
import { getAllUsers } from "@/services/UserService";
import { getAllResources } from "@/services/ResourceService";
import { getAllFaqs } from "@/services/FaqService";
import { getAllBlogs } from "@/services/BlogService"; // To get recent blogs
import { formatDistanceToNow } from "date-fns"; // To show "5 minutes ago"

// Assuming simplified interfaces for listing pages
interface ListItem {
  _id: string;
  createdAt: string;
  title?: string;
  name?: string;
  email?: string;
}

// Custom function to safely get the latest N items from a module's response
const getLatestItems = (data: ListItem[], limit = 5) => {
  if (!data || data.length === 0) return [];

  // Assume data is already roughly sorted or we sort it client-side by date
  const sortedData = data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sortedData.slice(0, limit);
};

const DashboardPage = () => {
  const [stats, setStats] = useState({
    products: 0,
    messages: 0,
    totalUsers: 0,
    resources: 0,
    faqs: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // --- 1. Fetch All Counts ---
        const [
          productsRes,
          messagesRes,
          usersRes,
          resourcesRes,
          faqsRes,
          blogsRes,
        ] = await Promise.all([
          getAllProducts(),
          getAllContacts(),
          getAllUsers(),
          getAllResources(),
          getAllFaqs(),
          getAllBlogs(),
        ]);

        // --- 2. Update Stats ---
        setStats({
          products: productsRes?.data?.length || 0,
          messages: messagesRes?.data?.length || 0,
          totalUsers: usersRes?.data?.length || 0,
          resources: resourcesRes?.data?.length || 0,
          faqs: faqsRes?.data?.length || 0,
        });

        // --- 3. Build Recent Activity Feed (Using latest 5 of each module) ---
        const recentProducts = getLatestItems(productsRes?.data || [], 5).map(
          (p) => ({
            time: p.createdAt,
            description: `New Product created: "${p.name || p.title}"`,
            module: "Products",
            icon: Package,
            color: "text-blue-600",
          })
        );

        const recentBlogs = getLatestItems(blogsRes?.data || [], 5).map(
          (b) => ({
            time: b.createdAt,
            description: `New Blog Post published: "${b.title}"`,
            module: "Blogs",
            icon: PenTool,
            color: "text-orange-600",
          })
        );

        const recentMessages = getLatestItems(messagesRes?.data || [], 5).map(
          (m) => ({
            time: m.createdAt,
            description: `New Contact Message from ${m.name || m.email}`,
            module: "Messages",
            icon: Mail,
            color: "text-purple-600",
          })
        );

        // Combine all, sort by date (descending), and take the top 10
        const combinedActivity = [
          ...recentProducts,
          ...recentBlogs,
          ...recentMessages,
        ]
          .sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          )
          .slice(0, 10);

        setRecentActivity(combinedActivity);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Data for the Stats Cards
  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "/admin/dashboard/products",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
      link: "/admin/dashboard/users",
    },
    {
      title: "New Messages",
      value: stats.messages,
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50",
      link: "/admin/dashboard/contacts",
    },
    {
      title: "Blog Posts",
      value: stats.(blogs)as any || 0,
      icon: PenTool,
      color: "text-orange-600",
      bg: "bg-orange-50",
      link: "/admin/dashboard/blogs",
    },
    {
      title: "Total FAQs",
      value: stats.faqs,
      icon: CheckCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      link: "/admin/dashboard/faqs",
    },
    {
      title: "Resources",
      value: stats.resources,
      icon: ResourceIcon,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      link: "/admin/dashboard/resources",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">
        System Health & Overview
      </h1>

      {/* --- Section 1: Enhanced Stats Cards (3x2 Grid) --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card
            key={card.title}
            className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                Go to {card.title.split(" ").pop()}{" "}
                <UserIcon className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Section 2: Recent Content Activity --- */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <GitCommit className="h-5 w-5 text-gray-600" />
            Recent Content Changes
          </CardTitle>
          <CardDescription>
            Latest 10 additions across Products, Blogs, and Contact Messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center p-6 text-gray-500">
              Loading recent activities...
            </div>
          ) : recentActivity.length > 0 ? (
            <ol className="relative border-l border-gray-200 ml-4 space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <li
                    key={index}
                    className="ml-6 flex items-start">
                    <span
                      className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white ${
                        activity.color
                      } ${activity.color
                        .replace("text-", "bg-")
                        .replace("-600", "-50")}`}>
                      <IconComponent className="h-3 w-3" />
                    </span>
                    <div>
                      <time className="block text-xs font-semibold leading-none text-gray-400">
                        {formatDistanceToNow(new Date(activity.time), {
                          addSuffix: true,
                        })}
                      </time>
                      <p className="text-sm text-gray-900 font-medium mt-1">
                        {activity.description}
                      </p>
                      <span className="text-xs text-gray-500 italic">
                        Module: {activity.module}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="text-center p-6 text-gray-500">
              No recent activity found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Section */}
      <div className="bg-white rounded-lg border p-8 text-center mt-8 shadow-inner">
        <h2 className="text-lg font-semibold">GSL Admin Panel Ready</h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
          All systems operational. Use the navigation links above and the
          sidebar to access management modules.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
