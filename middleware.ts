import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const res = createClient(request);
  const supabase = await import('@/utils/supabase/server').then(m => m.createClient);

  // Simple auth check - you may want to enhance this later
  // For now, rely on route handlers and RSC checks for full auth verification
  const pathname = request.nextUrl.pathname;

  // Protect admin and dashboard routes (basic check)
  if (
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/admin')) &&
    request.cookies.get('sb-auth-token') === undefined
  ) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Redirect authenticated users away from auth page
  if (pathname === '/auth' && request.cookies.get('sb-auth-token')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
