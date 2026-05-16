import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isLogin = pathname === '/admin/login';
    const token = req.nextauth.token;
    const isAdmin = Boolean(token?.isAdmin);

    if (isLogin && isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (!isLogin && !isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
