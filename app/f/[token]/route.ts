import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  if (!token || token.length !== 8) {
    return NextResponse.redirect(new URL('/founding', request.url));
  }
  
  return NextResponse.redirect(new URL(`/founding/${token}`, request.url));
}
