import { NextResponse } from 'next/server';

const protectedRoutes = ['/',];
const publicRoutes = ['/login', '/signup'];

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // If trying to access a protected route without a token
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/signup', request.url);
        loginUrl.searchParams.set('redirect', pathname); // Preserve intended destination
        return NextResponse.redirect(loginUrl);
    }

    // If trying to access a public route (login/signup) while authenticated
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};