import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  //   return NextResponse.redirect(new URL('/home', request.url))
  const token = request.cookies.get('token')?.value
  // console.log('token', token)

  if (request.nextUrl.pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // return NextResponse.redirect(new URL('/dashboard', request.url))

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/dashboard', '/pharmacies/:path*', '/appointment', '/hospital', '/profile']
}