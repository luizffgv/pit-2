import { PrismaClient } from "../../prisma/prisma-client-js";
export type { Product } from "../../prisma/prisma-client-js";

export const prisma = new PrismaClient();

await prisma.$connect();
