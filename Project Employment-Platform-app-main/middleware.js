// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // You can add authentication checks or other middleware logic here
  return NextResponse.next();
}

export function onError(error, request) {
  console.error('Middleware error:', error);
  return new NextResponse(JSON.stringify({ success: false, message: 'Server error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}