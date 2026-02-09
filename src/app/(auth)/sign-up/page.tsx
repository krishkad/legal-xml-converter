"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Building2,
  Phone,
  Image as ImageIcon,
  Lock,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    companyOrOrganization: "",
    phoneNo: "",
    profilePicUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (!res.success) {
        alert(res.message);
        return;
      }
      router.push("/sign-in");
    } catch (error) {
      console.log("Error while signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#eef1f5] to-[#e7ebf0] dark:from-[#0c0c0e] dark:via-[#111113] dark:to-[#17171a] px-4">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-primary/30 rounded-full blur-[140px]" />

      <Card className="relative w-full max-w-sm overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-neutral-900/60 border border-white/40 dark:border-neutral-800/50 shadow-xl rounded-2xl transition-all">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
            <Link href={"/"}>Court XML</Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground/80">
            Create your account
          </p>
        </CardHeader>

        {/* SLIDER CONTAINER */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(step - 1) * 100}%)`,
            }}
          >
            {/* STEP 1 */}
            <CardContent className="w-full shrink-0 space-y-6 px-6 pb-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      name="fname"
                      placeholder="John"
                      onChange={handleOnChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      name="lname"
                      placeholder="Doe"
                      onChange={handleOnChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    onChange={handleOnChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handleOnChange}
                    className="pl-10 pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={() => setStep(2)}>
                Next <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </CardContent>

            {/* STEP 2 */}
            <CardContent className="w-full shrink-0 space-y-6 px-6 pb-6">
              {/* Company */}
              <div className="space-y-2">
                <Label>Company / Organization</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="companyOrOrganization"
                    placeholder="Acme Pvt. Ltd."
                    onChange={handleOnChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="phoneNo"
                    placeholder="+91 98765 43210"
                    onChange={handleOnChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Profile Pic */}
              <div className="space-y-2">
                <Label>Profile Picture URL (Optional)</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="profilePicUrl"
                    placeholder="https://example.com/photo.jpg"
                    onChange={handleOnChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>

                <Button
                  className="px-6"
                  onClick={handleSignUp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </CardContent>
          </div>
        </div>

        <CardFooter className="text-center pb-6">
          <p className="text-xs text-muted-foreground w-full">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
