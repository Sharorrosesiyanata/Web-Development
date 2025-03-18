import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/db';  // Ensure correct path

export async function GET() {
    try {
        const books = await prisma.book.findMany();
        console.log("🔥 Books fetched from DB:", books);  // Log the data

        if (!books || books.length === 0) {
            console.log("⚠️ No books found in DB");
        }

        return NextResponse.json(books);
    } catch (error) {
        console.error("🚨 Error fetching books:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
