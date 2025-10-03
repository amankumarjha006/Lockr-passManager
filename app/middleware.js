import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
  const token = req.cookies.get("sb-access-token"); // Supabase stores auth tokens in cookies
  const url = req.nextUrl.clone();

  // Pages to protect
  const protectedPaths = ["/dashboard", "/delete", "/profile"];
  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/delete/:path*", "/profile/:path*"]
};
