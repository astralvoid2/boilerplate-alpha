import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "@/lib/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log("Seed: admin already exists:", adminEmail);
    return;
  }

  const passwordHash = await hashPassword("Admin123!");
  const userCount = await prisma.user.count();

  await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Admin",
      passwordHash,
      role: userCount === 0 ? Role.ADMIN : Role.USER
    }
  });

  console.log("Seeded admin:", adminEmail, "password: Admin123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
