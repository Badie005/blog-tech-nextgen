import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const token = req.nextauth.token as { role?: string } | null;

    // /dashboard requires authentication
    if (nextUrl.pathname.startsWith("/dashboard") && !token) {
      const url = new URL("/sign-in", nextUrl);
      url.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
      return NextResponse.redirect(url);
    }

    // /admin requires ADMIN role
    if (nextUrl.pathname.startsWith("/admin")) {
      const role = token?.role;
      if (!token || role !== "ADMIN") {
        const url = new URL("/sign-in", nextUrl);
        url.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Let route function handle fine-grained checks. Basic presence is fine.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
