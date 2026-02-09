import { Subscription } from "@/generated/prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToMB(bytes: number, useBinary: boolean = true): number {
  const divisor = useBinary ? 1024 * 1024 : 1000 * 1000;
  return +(bytes / divisor).toFixed(2);
}

export function calculatePercentage(obtained: number, total: number): number {
  if (typeof obtained !== "number" || typeof total !== "number") {
    return 0;
  }

  if (total === 0) {
    return 0;
  }
  const percentage = (obtained / total) * 100;
  return parseInt(percentage.toFixed(2));
}

export const getActiveSubscription = (
  subscriptions: Subscription[],
): Subscription => {
  const activeSubs = subscriptions
    .filter((subs) => subs.status === "ACTIVE")
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  const latest_expired_sub = subscriptions
    .filter((subs) => subs.status === "EXPIRED")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  console.log({ latest_expired_sub });
  return activeSubs[0] ? activeSubs[0] : latest_expired_sub[0];
};

export function displayAmount(amountInPaisa: number) {
  // Check if the input is a valid number
  if (isNaN(amountInPaisa) || amountInPaisa === null) {
    return 0;
  }

  // Convert paisa to INR (divide by 100) and format to 2 decimal places
  const amountInINR = (amountInPaisa / 100).toFixed(2);

  // Return the amount as a float
  return parseFloat(amountInINR).toFixed(2);
}




