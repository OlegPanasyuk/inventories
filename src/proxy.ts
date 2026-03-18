import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decryptSession } from "@/lib/auth/session";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = matchesRoute(path, protectedRoutes);
  const isAuthRoute = matchesRoute(path, authRoutes);
  const session = await decryptSession(req.cookies.get("session")?.value);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)"],
};