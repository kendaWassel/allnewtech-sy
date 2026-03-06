import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip Next internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already localized
  if (pathname.startsWith("/en") || pathname.startsWith("/ar")) {
    return NextResponse.next();
  }

  // Detect browser language
  const acceptLang = request.headers.get("accept-language") || "";
  const isArabic = acceptLang.toLowerCase().startsWith("ar");

  const locale = isArabic ? "ar" : "en";

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next).*)"],
};