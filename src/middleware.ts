import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

// export async function middleware(request: NextRequest) {
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl
    

    if(token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') 
        )
    ){
         return NextResponse.redirect(new URL('/', request.url))
    }
    if(!token && url.pathname.startsWith('/profile')){

      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()

}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/profile/:path*'
],
}