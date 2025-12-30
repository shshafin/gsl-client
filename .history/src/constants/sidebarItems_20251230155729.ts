import {
  LayoutDashboard,
  Package,
  Newspaper,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Mail,
  UserCog, // 🆕 Import this icon
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management", // 🆕 Added here
    path: "/admin/dashboard/users",
    icon: UserCog,
  },
  {
    title: "Products",
    path: "/admin/dashboard/products",
    icon: Package,
  },
  {
    title: "Blogs & News",
    path: "/admin/dashboard/blogs",
    icon: Newspaper,
  },
  // {
  //   title: "Team Members",
  //   path: "/admin/dashboard/team",
  //   icon: Users,
  // },
  {
    title: "Messages",
    path: "/admin/dashboard/messages",
    icon: Mail,
  },
  {
    title: "Resources (PDF)",
    path: "/admin/dashboard/resources",
    icon: FileText,
  },
  {
    title: "FAQ",
    path: "/admin/dashboard/faq",
    icon: HelpCircle,
  },
  {
    title: "Site Settings",
    path: "/admin/dashboard/settings",
    icon: Settings,
  },
];
