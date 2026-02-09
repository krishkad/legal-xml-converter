"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function DashboardHeader() {
  const [render, setRender] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user } = useSelector((state: RootState) => state.user);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      router.refresh();
    } catch (error) {
      console.log("error while logging out: ", error);
    }
  };

  useEffect(() => {
    setRender(true);
  }, []);

  if (!render) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
      <div className="flex h-14 items-center justify-between gap-4 px-4">
        <div className="flex h-full items-center justify-center gap-4">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>{`${user.fname
                    ?.slice(0,1)
                    .toUpperCase()}${user.lname
                    ?.slice(0,1)
                    .toUpperCase()}`}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">
                  {user.fname} {user.lname}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
