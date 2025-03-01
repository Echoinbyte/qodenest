import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
