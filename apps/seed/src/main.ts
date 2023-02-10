import { PrismaClient } from "@artsell/database"

const prisma = new PrismaClient()

const main = async () => {
  try {
    await prisma.user.create({
      data: {
        email: "john.doe2@gmail.com",
        password: "password",
        firstName: "John",
        lastName: "Doe",
      },
    })
  } catch {
    console.log("User already exists")
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
