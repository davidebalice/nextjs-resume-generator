import { NextResponse } from "next/server";

const isAuthenticated = (req) => {
  const token = req.cookies.get("token");
  return token !== undefined;
};

const isProtectedRoute = (path) => {
  return path.startsWith("/dashboard");
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(pathname) && !isAuthenticated(req)) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/(.*)", "/resume/(.*)", "/api/(.*)"],
};
