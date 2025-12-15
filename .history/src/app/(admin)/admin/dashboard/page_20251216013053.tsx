"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Users,
  Mail,
  FileText,
  Activity,
  Clock,
  CheckCircle,
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
import { getAllFaqs } from "@/services/FaqService"; // Assuming you have this service

// 🆕 Chart Imports from recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF0044",
];

const DashboardPage = () => {
  const [stats, setStats] = useState({
    products: 0,
    messages: 0,
    superAdmins: 0,
    admins: 0,
    moderators: 0,
    resources: 0,
    faqs: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data sources concurrently
        const [productsRes, messagesRes, usersRes, resourcesRes, faqsRes] =
          await Promise.all([
            getAllProducts(),
            getAllContacts(),
            getAllUsers(),
            getAllResources(),
            getAllFaqs(), // Fetch FAQ count
          ]);

        const allUsers = usersRes?.data || [];
        const userRoles = allUsers.reduce((acc: any, user: any) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        setStats({
          products: productsRes?.data?.length || 0,
          messages: messagesRes?.data?.length || 0,
          superAdmins: userRoles.super_admin || 0,
          admins: userRoles.admin || 0,
          moderators: userRoles.moderator || 0,
          totalUsers: allUsers.length,
          resources: resourcesRes?.data?.length || 0,
          faqs: faqsRes?.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 1. Data for the Stats Cards
  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "New Messages",
      value: stats.messages,
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "PDF Resources",
      value: stats.resources,
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Total FAQs",
      value: stats.faqs,
      icon: CheckCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  // 2. Data for the Bar Chart (Simulated Activity Funnel)
  const activityData = [
    { name: "Views", count: 4000, color: COLORS[0] },
    { name: "Inquiries", count: 2400, color: COLORS[1] },
    { name: "Quotes", count: 1800, color: COLORS[2] },
    { name: "Orders", count: 1200, color: COLORS[3] },
  ];

  // 3. Data for the Role Distribution Pie Chart (Real Data)
  const roleData = [
    { name: "Super Admin", value: stats.superAdmins, color: COLORS[0] },
    { name: "Admin", value: stats.admins, color: COLORS[1] },
    { name: "Moderator", value: stats.moderators, color: COLORS[2] },
  ].filter((item) => item.value > 0);

  // 4. Simulated Recent Activity Log
  const recentActivity = [
    { time: "1 min ago", description: "Super Admin updated Site Settings." },
    {
      time: "5 mins ago",
      description: 'Moderator created a new Product: "Metal Alloy X".',
    },
    { time: "1 hour ago", description: "Admin deleted User ID #456." },
    {
      time: "3 hours ago",
      description: "New contact message received from Jane Doe.",
    },
    { time: "Yesterday", description: "System backup initiated." },
  ];

  if (loading)
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        Loading Dashboard Data...
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      {/* --- Section 1: Stat Cards (5-Column Grid, wraps responsively) --- */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {statCards.map((card) => (
          <Card
            key={card.title}
            className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Data refreshed now
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Section 2: Charts (Responsive 3-Column Grid) --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Funnel Chart (2/3 width) */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-gray-600" />
              Website Activity Funnel (Simulated)
            </CardTitle>
            <CardDescription>
              Visualizing conversions from views to orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer
                width="100%"
                height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e0e0e0"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    formatter={(value: number) => [
                      value.toLocaleString(),
                      "Count",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Activity Count"
                    radius={[4, 4, 0, 0]}>
                    {activityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Role Distribution Pie Chart (1/3 width) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-5 w-5 text-gray-600" />
              Staff Role Distribution
            </CardTitle>
            <CardDescription>Total Staff: {stats.totalUsers}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full flex items-center justify-center">
              {roleData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }>
                      {roleData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Users",
                      ]}
                    />
                    <Legend
                      iconType="circle"
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500">No staff users found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Section 3: Recent Activity Log --- */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="h-5 w-5 text-gray-600" />
            Recent System Activity (Simulated Log)
          </CardTitle>
          <CardDescription>
            A log of key actions performed by administrators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="relative border-l border-gray-200 ml-4">
            {recentActivity.map((activity, index) => (
              <li
                key={index}
                className="mb-4 ml-6">
                <span className="absolute flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full -left-1.5 ring-4 ring-white"></span>
                <time className="block mb-1 text-xs font-normal leading-none text-gray-400">
                  {activity.time}
                </time>
                <h3 className="text-sm font-semibold text-gray-900">
                  {activity.description}
                </h3>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Existing Welcome Section - Kept for clear final section */}
      <div className="bg-white rounded-lg border p-8 text-center mt-8 shadow-inner">
        <h2 className="text-lg font-semibold">
          Welcome to the GSL Admin Panel
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
          Use the sidebar to manage content. Your dashboard provides real-time
          statistics and a system activity overview.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
