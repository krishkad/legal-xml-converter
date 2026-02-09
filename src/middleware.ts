import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/upload",
  "/dashboard/subscription",
  "/dashboard/documents",
  "/dashboard/settings",
  "/dashboard/support",
];

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(
    `${process.env.COOKIE_NAME as string}`
  )?.value;

  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (token) {
    if (isProtectedRoute) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.next();
      } catch (error) {
        console.log("error jwt in middleware", error);

        const response = NextResponse.redirect(
          new URL("/sign-in", request.url)
        );
        response.cookies.delete("freeposal-authentication");
        return response;
      }
    }
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard/upload", request.url)); // or home
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}