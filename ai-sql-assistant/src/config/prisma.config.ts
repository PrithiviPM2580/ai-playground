// ============================================================
// 🔹PrismaConfig — Configuration for Prisma Client
// ============================================================
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

// Initialize Prisma MariaDB Adapter with environment variables
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Create Prisma Client instance with the MariaDB adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
