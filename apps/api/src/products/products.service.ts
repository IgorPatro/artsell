import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany()
  }

  async findOne(slugOrId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
    })

    if (!product)
      throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return product
  }

  async findNew() {
    return await this.prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 30,
    })
  }
}
