/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Package, Users, Mail, HelpCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/services/ProductService";
import { getAllContacts } from "@/services/ContactService";
import { getAllUsers } from "@/services/UserService";
import { getAllResources } from "@/services/ResourceService";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    messages: 0,
    users: 0,
    resources: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch everything in parallel
        const [productsRes, messagesRes, usersRes, resourcesRes] =
          await Promise.all([
            getAllProducts(), // Just checking count if API supports pagination metadata
            getAllContacts(),
            getAllUsers(),
            getAllResources(),
          ]);

        setStats({
          products: productsRes?.data?.length || 0, // Ideally backend sends 'meta.total'
          messages: messagesRes?.data?.length || 0,
          users: usersRes?.data?.length || 0,
          resources: resourcesRes?.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Active Users",
      value: stats.users,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Resources",
      value: stats.resources,
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +0% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add a generic Welcome Section */}
      <div className="bg-white rounded-lg border p-8 text-center mt-8">
        <h2 className="text-lg font-semibold">Welcome to the Admin Panel</h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
          Select a module from the sidebar to manage your website content. If
          you need assistance, please contact the support team.
        </p>
      </div>
    </div>
  );
}
