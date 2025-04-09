import { PrismaClient } from '@prisma/client';

// Check for a database URL
if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable");
}

// Create a new PrismaClient instance
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || 
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;