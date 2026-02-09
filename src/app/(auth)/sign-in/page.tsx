"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function SignInPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (!res.success) {
        console.log(res.message);
        return;
      }
      router.refresh();
    } catch (error) {
      console.log("Error while signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/80 to-background/90 px-4">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-primary/30 rounded-full blur-[140px]" />
      <Card className="w-full max-w-sm shadow-xl transition-all duration-300 hover:shadow-2xl border border-border">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent tracking-tight">
            <Link href={"/"}>Court XML </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Welcome back. Please sign in to continue.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleOnChange}
                placeholder="you@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleOnChange}
                placeholder="••••••••"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button
            className="w-full"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Button variant="outline" className="w-full flex items-center gap-2">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8c0-17.8-1.6-35-4.7-51.8H249v98h135c-6 32-24.1 59.1-51.5 77.2l83.3 64.7c48.7-44.8 76.7-110.9 76.7-188.1z"
              />
              <path
                fill="currentColor"
                d="M249 492c67.7 0 124.5-22.4 166-60.8l-83.3-64.7c-23.1 15.5-52.7 24.7-82.7 24.7-63.8 0-117.8-43-137.1-100.8H26.4v63.3C67.8 438.2 151.4 492 249 492z"
              />
              <path
                fill="currentColor"
                d="M111.9 290.4c-9.3-27.8-9.3-58.2 0-86L26.4 141.1C-8.8 208.4-8.8 303.6 26.4 370.9l85.5-80.5z"
              />
              <path
                fill="currentColor"
                d="M249 97.8c36.8 0 69.7 12.7 95.6 37.6l71.5-71.5C373.5 24.5 316.7 0 249 0 151.4 0 67.8 53.8 26.4 141.1l85.5 63.3C131.2 140.8 185.2 97.8 249 97.8z"
              />
            </svg>
            Sign in with Google
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-2">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-primary hover:underline">
              Create one
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
