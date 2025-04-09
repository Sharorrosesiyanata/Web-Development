const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Try a simple query
    console.log('Testing database connection...');
    
    // Try to access the books table
    const books = await prisma.book.findMany();
    console.log('Connection successful! Books:', books);
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();