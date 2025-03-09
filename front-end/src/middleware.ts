import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req?.cookies?.get("token")?.value;
    if (!token) {
        return NextResponse.error();
    }
    try {
        const { payload } = await jwtVerify(token, new TextEncoder()?.encode(process.env.NEXT_PUBLIC_JWT_SECRET));
        if (payload?.role === "admin") {
            return NextResponse.next();
        }
        else {
            return NextResponse.error();
        }
    } catch (error) {
        console.log(error);
        return NextResponse?.redirect(new URL("/", req?.nextUrl));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}