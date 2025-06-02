import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

type Role = 'admin' | 'teacher' | 'student' | 'guest'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in/:path*',
  '/sign-up/:path*',
  '/api/webhook/clerk'
])

const isAdminRoute = createRouteMatcher(['/admin/:path*'])
const isDashboardRoute = createRouteMatcher(['/dashboard/:path*'])
const isTeacherRoute = createRouteMatcher(['/courses/:path*'])
const isStudentRoute = createRouteMatcher(['/assignments/:path*'])

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return NextResponse.next()
  }

  const { userId, sessionClaims, redirectToSignIn } = await auth()

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: request.url })
  }

  const role = (sessionClaims?.metadata as { role: Role })?.role || 'guest'

  if (isAdminRoute(request) && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (isDashboardRoute(request) && !['admin', 'teacher', 'student'].includes(role)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (isTeacherRoute(request) && !['admin', 'teacher'].includes(role)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (isStudentRoute(request) && !['admin', 'teacher', 'student'].includes(role)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
