import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "@libs/jwt";

export function proxy(request: NextRequest) {
  // const dispatch = useDispatch();
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("token")?.value;

  // console.log("accessToken",accessToken)

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const { role } = decodeToken(accessToken);


  if(role=="admin" && pathname.startsWith("/") && !pathname.startsWith("/admin")){
      return NextResponse.redirect(new URL("/admin", request.url));
  }


  if (role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/protected/:path*", "/admin/:path*", "/reviewer/:path*"],
};
