import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
// import Cookies from "universal-cookie";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const response = new NextResponse();

  const token = request.cookies.get("token")?.value || "";

  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      // const data = res.status;

      if (res.status == 200) {
        return NextResponse.next();
      }
      // console.log(data);
      // if (data.success) {

      // }
    } catch (error) {
      console.log(error);
      //  return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  return NextResponse.redirect(new URL("/signin", request.url));
  // console.log(token);
  // try {
  //   const { payload } = await jwtVerify(
  //     token as string,
  //     new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_TOKEN)
  //   );
  //   // console.log(payload);
  //   if (payload) {
  //     const now = new Date();
  //     const exp = new Date(Number((payload?.exp as number) * 1000));
  //     // console.log(now);
  //     // console.log(exp);
  //     if (now >= exp) {
  //       request.cookies.delete("token");
  //       return NextResponse.redirect(new URL("/signin", request.url));
  //     }
  //     return NextResponse.next();
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // return NextResponse.redirect(new URL("/signin", request.url));
  // if (!payload) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
  // return true;
  // console.log(payload);
  // return false;
  // if (getCookie) {
  // }
  // return NextResponse.redirect(new URL("/", request.url));
  // return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/property/:path*",
};
