import authConfig from "auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiTrpcPrefix,
  apiWebhookPrefix,
  authRoutes,
  publicRoutes,
  slugPrefix,
} from "./lib/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiWebhookRoute = nextUrl.pathname.startsWith(apiWebhookPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isTRPCRouter = nextUrl.pathname.startsWith(apiTrpcPrefix);
  const isSlugRoute = nextUrl.pathname.startsWith(slugPrefix);

  if (isApiRoute) return NextResponse.next();

  if (isTRPCRouter) return NextResponse.next();

  if (isSlugRoute) return NextResponse.next();

  if (isApiWebhookRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
