// app/api/applications/[id]/route.js
import { NextResponse } from 'next/server';

// Reference to the same applications array
// In a real app, this would be a database call
let applications = [
  { id: '1', name: 'React Developer', application: 'Applied on 2025-04-01' },
  { id: '2', name: 'Full Stack Engineer', application: 'Applied on 2025-04-05' },
];

export async function DELETE(request, { params }) {
  const { id } = params;
  
  applications = applications.filter(app => app.id !== id);
  
  return NextResponse.json({ success: true });
}