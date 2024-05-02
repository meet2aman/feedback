import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const generatedToken = request.cookies.get("token")?.value || "";

  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    (token || generatedToken) &&
    (url.pathname.startsWith("sign-in") ||
      url.pathname.startsWith("sign-up") ||
      url.pathname.startsWith("verify") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if ((!token || !generatedToken) && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/verify/:path*"],
};
