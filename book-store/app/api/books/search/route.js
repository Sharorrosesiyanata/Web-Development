// import { NextResponse } from "next/server";
// import { prisma } from "../../../db";

// //filtering through books using keywords
// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get('query');

//     const filteredBooks = await prisma.book.findMany({
//         where: {
//             title: {
//                 contains: query
//             }
//         }
//     });

//     return NextResponse.json(filteredBooks);
// };

// //creating a new book
// export async function POST(req) {
//     const { title, link, img } = await req.json();
//     const newBook = {
//         id: books.length + 1,
//         title,
//         link,
//         img
//     };
//     bookes.push(newBook);

//     return NextResponse.json("Book added successfully");

// };

// app/api/books/search/route.js
import { prisma } from "../../../../db";  // Adjust path as needed
import { NextResponse } from "next/server";

export async function GET(req) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    
    const books = await prisma.book.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive'
            }
        }
    });
    
    return NextResponse.json(books);
}