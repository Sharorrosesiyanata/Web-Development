import { prisma } from "../../db";
import { NextResponse } from "next/server";


export async function GET(req) {
    const books = await prisma.book.findMany();
    console.log("GET books called");

    return NextResponse.json(books);
}

export async function POST(req) {
    const { title, link, img } = await req.json();

    const newBook = await prisma.book.create({
        data: {
            title,
            link,
            img,
        },
    });

    return NextResponse.json(newBook);
}
