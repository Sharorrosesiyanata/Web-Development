import { prisma } from "../../db";  // Make sure this path is correct
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("API: Attempting to fetch books");
    
    // Test database connection
    await prisma.$connect();
    console.log("API: Database connection successful");
    
    // Get all books from the database
    const books = await prisma.book.findMany();
    console.log(`API: Found ${books.length} books`);
    
    // Return the books array
    return NextResponse.json(books);
  } catch (error) {
    console.error("API Error fetching books:", error);
    
    // Return a proper error response
    return NextResponse.json(
      { error: "Failed to fetch books", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { title, link, img } = await req.json();
    
    // Validate input
    if (!title || !link || !img) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create a new book
    const newBook = await prisma.book.create({
      data: { title, link, img },
    });
    
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book", details: error.message },
      { status: 500 }
    );
  }
}