import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes - allow access without authentication
        const publicRoutes = ['/login', '/register', '/', '/api/auth'];

        if (publicRoutes.some((route) => pathname.startsWith(route))) {
          return true;
        }

        // Check NextAuth token instead of custom cookie
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
      // NextAuth will automatically add ?callbackUrl= to the signIn page
    },
  }
);

export const config = {
  matcher: [
    '/cart/:path*',
    '/account/:path*',
    '/profile/:path*',
    '/orders/:path*',
  ],
};
