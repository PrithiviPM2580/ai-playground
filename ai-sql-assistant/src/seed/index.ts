// ============================================================
// 🔹SeedData — Seed initial data into the database
// ============================================================

import prisma from "src/config/prisma.config.js";
import {
  CREATE_BATCHES,
  CREATE_FEES,
  CREATE_STUDENTS,
} from "../constants/index.js";

// ------------------------------------------------------
// seedData() — Seed initial data into the database
// ------------------------------------------------------
async function seedData() {
  await prisma.batch.createMany({
    data: CREATE_BATCHES,
  });
  await prisma.student.createMany({
    data: CREATE_STUDENTS,
  });
  await prisma.fee.createMany({
    data: CREATE_FEES,
  });
}

// Execute the seeding process
seedData()
  .then(() => {
    console.log("Seeding Complete");
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
