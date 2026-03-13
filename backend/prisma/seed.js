const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {

  const passwordHash = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { login: "admin" },
    update: {},
    create: {
      name: "Admin",
      login: "admin",
      password: passwordHash,
      role: "ADMIN"
    }
  })

  console.log("Usuário admin criado:", admin.login)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })