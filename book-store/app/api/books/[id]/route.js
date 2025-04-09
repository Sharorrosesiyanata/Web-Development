// app/api/books/[id]/route.js
import { prisma } from "../../../db";  // Adjust path as needed
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;
  
  try {
    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { id }
    });
    
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }
    
    // Delete the book
    await prisma.book.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book", details: error.message },
      { status: 500 }
    );
  }
}