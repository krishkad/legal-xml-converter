import React, { ReactNode } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReduxProviderWithInit from "@/redux/ReduxProviderWithInit";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { subscription, documents, user } = await getData();
  return (
    <ReduxProviderWithInit
      subscriptions={subscription}
      documents={documents}
      user={user}
    >
      <SidebarProvider>
        <div className="min-h-screen relative flex w-full">
          <DashboardSidebar />
          <SidebarInset className="w-full overflow-hidden">
            <div className="flex-1 flex flex-col bg-sidebar">
              <DashboardHeader />
              <main className="w-full p-6 bg-sidebar">
                <div className="max-w-7xl mx-auto">{children}</div>
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ReduxProviderWithInit>
  );
};

export default DashboardLayout;

const getData = async () => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    // Define API URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const subscriptionUrl = `${baseUrl}/api/subscription/get-all`;
    const documentsUrl = `${baseUrl}/api/documents/get-all`;
    const userUrl = `${baseUrl}/api/user/get-user`;

    // Define fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
    };

    // Fetch both APIs in parallel
    const [subscriptionRes, documentsRes, userRes] = await Promise.all([
      fetch(subscriptionUrl, fetchOptions),
      fetch(documentsUrl, fetchOptions),
      fetch(userUrl, fetchOptions),
    ]);

    const [subscriptionJson, documentsJson, userJson] = await Promise.all([
      subscriptionRes.json(),
      documentsRes.json(),
      userRes.json(),
    ]);

    // Check success status of both
    const subscriptionData = subscriptionJson.success
      ? subscriptionJson.data
      : [];
    const documentsData = documentsJson.success ? documentsJson.data : [];
    const userData = userJson.success ? userJson.data : [];

    return {
      subscription: subscriptionData,
      documents: documentsData,
      user: userData,
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      subscription: [],
      documents: [],
      user: {},
    };
  }
};
