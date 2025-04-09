// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

// export default clerkMiddleware((auth, req) => {
//   if (!isPublicRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
