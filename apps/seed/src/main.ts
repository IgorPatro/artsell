import { PrismaClient } from "@artsell/database"
import { products, users } from "./app/data"

const prisma = new PrismaClient()

const main = async () => {
  await prisma.user
    .createMany({
      data: users,
      skipDuplicates: true,
    })
    .catch((e) => {
      console.error(e)
      console.log("User already exists")
    })

  await prisma.product
    .createMany({
      data: products,
      skipDuplicates: true,
    })
    .catch((e) => {
      console.error(e)
      console.log("Product already exists")
    })
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
