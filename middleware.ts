// Tutorial Code ---------------------------------------------------------------------------------------

// import { Protect } from '@clerk/nextjs';
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

// export default clerkMiddleware((auth, req) => {
//   if (!isPublicRoute(req)) auth.protect();
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
// -----------------------------------------------------------------------------------------------------

//GPT CODE----------------------------------------------------------------------------------------------

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/']);

// export default clerkMiddleware(async (auth, req) => {
  //   console.log(req.headers.get('__clerk_db_jwt'))
//   if (!isPublicRoute(req)) {
  //     const signInUrl = new URL('/sign-in', req.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// });

// export const config = {
  //   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  // };
  // -----------------------------------------------------------------------------------------------------
  
  import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { log } from 'node:console'

export function middleware(request: NextRequest) {
  const protectedRoutes = !['/', '/sign-in', '/sign-up'].includes(request.nextUrl.pathname)

  // Assuming token is stored in cookies
  const token = request.cookies.get('__clerk_db_jwt')?.value

  if (protectedRoutes && !token ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

// Specify paths where this middleware should run
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
