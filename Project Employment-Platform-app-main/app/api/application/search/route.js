import { NextResponse } from "next/server";
import { prisma } from "../../../db";

//filtering through quotes using keywords
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  const filteredApplications = await prisma.application.findMany({
    where: {
      application: {
        contains: query
      }
    }
  });

  return NextResponse.json(filteredApplications);
};

//creating a new quote
export async function POST(req) {
  const { application, name } = await req.json();
  const newApplication = {
    id: application.length + 1,
    name,
    application
  };  
  application.push(newApplication);

  return NextResponse.json("Application added successfully");
};