import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 🛡️ 1. PROTECT DASHBOARD:
  // If trying to access any route starting with /admin/dashboard WITHOUT a token
  if (pathname.startsWith("/admin/dashboard") && !token) {
    // Redirect to Admin Login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 🔄 2. REDIRECT LOGGED-IN ADMIN:
  // If user is ALREADY logged in (has token) and tries to go to Login page
  if (pathname === "/admin/login" && token) {
    // Redirect straight to Dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Allow all other requests (Public Website, API, Static files)
  return NextResponse.next();
}

// ⚡ OPTIMIZATION: Only run middleware on admin routes
// This prevents the middleware from slowing down your public website
export const config = {
  matcher: ["/admin/:path*"],
};
