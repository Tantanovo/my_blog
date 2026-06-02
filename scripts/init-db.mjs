import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

execSync("npx prisma db push", { stdio: "inherit" });

const prisma = new PrismaClient();
try {
  const count = await prisma.profile.count();
  if (count === 0) {
    console.log("首次部署，写入初始数据...");
    execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
  } else {
    console.log("数据库已有数据，跳过 seed。");
  }
} finally {
  await prisma.$disconnect();
}
