import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/login", "/register", "/forgot-password"];
const protectedPaths = ["/home", "/profile", "/settings"];
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
const refreshEndpoint = "/auth/refreshtoken";
const isSecureCookie = process.env.NODE_ENV === "production";

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasAccessToken = Boolean(accessToken);
  const hasRefreshToken = Boolean(refreshToken);
  const isLoggedIn = hasAccessToken && hasRefreshToken;
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const target = isLoggedIn ? "/home" : "/login";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (isLoggedIn && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isLoggedIn && protectedPaths.includes(pathname)) {
    if (!hasAccessToken && hasRefreshToken && backendBaseUrl) {
      const refreshResponse = await refreshAccessToken(request, refreshToken);
      if (refreshResponse) {
        return refreshResponse;
      }
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && protectedPaths.includes(pathname) && backendBaseUrl) {
    try {
      const verifyResponse = await fetch(`${backendBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (verifyResponse.status === 401) {
        const refreshResponse = await refreshAccessToken(
          request,
          refreshToken
        );
        if (refreshResponse) {
          return refreshResponse;
        }
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

const refreshAccessToken = async (
  request: NextRequest,
  refreshToken: string | undefined
) => {
  if (!refreshToken || !backendBaseUrl) {
    return null;
  }
  try {
    const response = await fetch(`${backendBaseUrl}${refreshEndpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { accessToken?: string };
    if (!data.accessToken) {
      return null;
    }
    const maxAge = getAccessTokenMaxAge(data.accessToken, 15 * 60);
    const redirectResponse = NextResponse.redirect(request.url);
    redirectResponse.cookies.set({
      name: "accessToken",
      value: data.accessToken,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge,
      secure: isSecureCookie,
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });
    return redirectResponse;
  } catch {
    return null;
  }
};

const getAccessTokenMaxAge = (token: string, fallbackSeconds: number) => {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) {
      return fallbackSeconds;
    }
    const payloadJson = decodeBase64Url(payloadBase64);
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (typeof payload.exp !== "number") {
      return fallbackSeconds;
    }
    const nowSeconds = Math.floor(Date.now() / 1000);
    const maxAge = payload.exp - nowSeconds;
    return maxAge > 0 ? maxAge : fallbackSeconds;
  } catch {
    return fallbackSeconds;
  }
};

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );
  if (typeof atob === "function") {
    return atob(padded);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(padded, "base64").toString("utf8");
  }
  throw new Error("No base64 decoder available");
};

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/home",
    "/profile",
    "/settings",
  ],
};
