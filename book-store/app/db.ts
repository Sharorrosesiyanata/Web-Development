import { PrismaClient } from '@prisma/client'
import { global } from 'styled-jsx/css';
import dotenv from "dotenv"

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    })
    
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma