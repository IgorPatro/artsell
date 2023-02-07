import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany()
  }
}
