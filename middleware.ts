import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
// import Cookies from "universal-cookie";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deleteCookie } from "cookies-next";
import Cookies from 'js-cookie';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.cookies.delete('token')

  const token = request.cookies.get("token")?.value || "";

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status == 200) {
        return NextResponse.next();
      }
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(request.cookies)
  // deleteCookie("token");
  return NextResponse.redirect(new URL("/signin", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/property/:path*",
    "/company/:path*",
    "/dashboard/:path*",
    "/account/:path*",
  ],
};
