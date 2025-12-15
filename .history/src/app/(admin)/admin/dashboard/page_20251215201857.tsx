import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, MessageSquare, TrendingUp } from "lucide-react";

export default function DashboardHome() {
  const stats = [
    {
      title: "Total Products",
      value: "124",
      description: "+4 new this month",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Team Members",
      value: "12",
      description: "Active board members",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Total Inquiries",
      value: "573",
      description: "+19 unread messages",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      title: "Site Visits",
      value: "45.2k",
      description: "Analytics from last 30 days",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back, here is your GSL Export overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-md border border-dashed">
              Chart Placeholder (Install Recharts later)
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Client Name {i}
                    </p>
                    <p className="text-sm text-gray-500">
                      Inquiry about Product #{i}00
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-gray-400">
                    2m ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
