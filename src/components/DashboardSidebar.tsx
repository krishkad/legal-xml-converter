"use client"
import {
  Home,
  FileText,
  Upload,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  Scale,
  HeartIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Documents", url: "/dashboard/documents", icon: FileText },
  { title: "Upload", url: "/dashboard/upload", icon: Upload },
  { title: "Subscription", url: "/dashboard/subscription", icon: CreditCard },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Support", url: "/dashboard/support", icon: HelpCircle },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = usePathname();

  const isActive = (path: string) => location === path;
  const getNavCls = ({ isActive }: { isActive: boolean }): string => {
    if (isActive) {
      return "bg-sidebar-accent text-sidebar-accent-foreground";
    } else {
      return "hover:bg-sidebar-accent/50";
    }
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarContent>
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex h-14 items-center gap-2 px-4  border-b border-sidebar-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
              <HeartIcon className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-sidebar-foreground">
                Court XML
              </span>
            )}
          </div>
        </Link>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={
                        location === item.url
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
