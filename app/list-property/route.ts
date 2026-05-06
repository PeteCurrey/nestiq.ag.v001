import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/agents', process.env.NEXT_PUBLIC_SITE_URL || 'https://nestiq.avorria.com'));
}
