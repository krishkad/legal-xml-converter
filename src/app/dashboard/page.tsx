"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculatePercentage, getActiveSubscription } from "@/lib/utils";
import { RootState } from "@/redux/store";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  TrendingUp,
  Upload,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscriptions,
  );
  const { documents } = useSelector((state: RootState) => state.documents);

  const activeSubscription = getActiveSubscription(subscriptions);
  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your document conversion overview.
          </p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="gap-3 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-medium pb-0">
              Total Conversions
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{documents?.length}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="gap-3 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Monthly Quota</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSubscription?.conversions_done ?? 0}/
              {activeSubscription?.maxConversions ?? 0}
            </div>
            <Progress
              value={calculatePercentage(
                activeSubscription?.conversions_done ?? 0,
                activeSubscription?.maxConversions ?? 0,
              )}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {activeSubscription?.maxConversions -
                activeSubscription?.conversions_done}{" "}
              conversions remaining
            </p>
          </CardContent>
        </Card>

        {/* <Card className="gap-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card> */}

        <Card className="gap-3 bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 mb-0">
            <CardTitle className="text-sm font-medium pb-0 mb-0">
              Current Plan
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 mt-0">
            <div className="text-2xl font-bold">{activeSubscription?.plan}</div>
            <p className="text-xs text-muted-foreground">
              Limited to {activeSubscription?.maxConversions}/month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest document conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents
                .slice()
                .reverse()
                ?.map(
                  (item, index) =>
                    index <= 4 && (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {item.status === "success" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {item.status === "failed" && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            {item.status === "pending" && (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="max-w-[240px] text-sm font-medium truncate">
                              {item.name}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {item.name.split(".")[1].toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(new Date(item.createdAt))}
                        </span>
                      </div>
                    ),
                )}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/documents">
                <Button variant="outline" className="w-full gap-2">
                  View All Documents
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade CTA */}
        <Card className="border-accent bg-background h-max">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Upgrade Your Plan
            </CardTitle>
            <CardDescription>
              Get unlimited conversions and premium features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 h-max">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Unlimited document conversions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Bulk upload (up to 50 files)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Priority processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
            <Link href="/dashboard/subscription">
              <Button className="w-full" variant="default">
                Upgrade to Pro - $29/month
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function timeAgo(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}
