// app/api/applications/route.js
import { NextResponse } from 'next/server';

// Mock data for demonstration (replace with your actual data source)
let applications = [
  { id: '1', name: 'React Developer', application: 'Applied on 2025-04-01' },
  { id: '2', name: 'Full Stack Engineer', application: 'Applied on 2025-04-05' },
];

export async function GET() {
  return NextResponse.json(applications);
}

export async function POST(request) {
  const data = await request.json();
  const newApplication = {
    id: Date.now().toString(),
    ...data
  };
  
  applications.push(newApplication);
  return NextResponse.json(newApplication, { status: 201 });
}