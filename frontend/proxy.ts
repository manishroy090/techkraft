import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from '@libs/jwt';



export function proxy(request: NextRequest) {

    // const dispatch = useDispatch();
    const pathname = request.nextUrl.pathname
    const accessToken = request.cookies.get('token')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    const rolesRouter={
         "admin":["/admin/candiates","/admin/check","/admin/candiates/details/1"],
         "reviewer":["/reviewer","/reviewer/check"]
    }


    const {role} =  decodeToken(accessToken)

    const  authUserRoute = rolesRouter[role]

    const havePermission = authUserRoute.includes(pathname)

     if(!havePermission && pathname!='/')
         return NextResponse.redirect(new URL('/403', request.url));

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/protected/:path*', '/admin/:path*','/reviewer/:path*'],
}