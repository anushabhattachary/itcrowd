import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the route is under /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for the session cookie
    const authCookie = request.cookies.get('itcrowd_session');
    
    // If not authenticated, redirect to /login
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};
