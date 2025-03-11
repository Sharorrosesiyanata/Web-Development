import { prisma } from "../../db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const applications = await prisma.application.findMany();
  console.log("GET applications called");

  return NextResponse.json(applications);
}

export async function POST(req) {
  const { name, address, occupation, bio } = await req.json();

  const newApplication = await prisma.application.create({
    data: {
      name,
      application, 
    },
  });

  return NextResponse.json(newApplication);
}
