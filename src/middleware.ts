import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1. Handle i18n routing
  const intlResponse = intlMiddleware(request);

  // 2. Refresh Supabase auth session
  const supabaseResponse = await updateSession(request);

  // Merge cookies from supabase into intl response
  for (const cookie of supabaseResponse.cookies.getAll()) {
    intlResponse.cookies.set(cookie.name, cookie.value);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
    "/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
