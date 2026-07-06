import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "@libs/jwt";

export function proxy(request: NextRequest) {
  // const dispatch = useDispatch();
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("token")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const rolesRouter = {
    admin: ["/admin"],
    reviewer: ["/reviewer"],
  };

  const { role } = decodeToken(accessToken);

  if(role =="admin" && pathname =="/"){
    return NextResponse.redirect(new URL("/admin/candiates", request.url));

  }

  if(role =="reviewer" && pathname =="/"){
    return NextResponse.redirect(new URL("/reviewer", request.url));

  }

  type rolestypes = "admin" | "reviewer" ;

  const authUserRoute = rolesRouter[role as rolestypes];

  const havePermission = authUserRoute.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  if (!havePermission && pathname != "/")
    return NextResponse.redirect(new URL("/403", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/protected/:path*", "/admin/:path*", "/reviewer/:path*"],
};
