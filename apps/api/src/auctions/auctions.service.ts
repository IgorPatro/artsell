import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(slugOrId: string) {
    const auction = await this.prisma.auction.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
    })

    if (!auction)
      throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return auction
  }

  async findAll() {
    return await this.prisma.auction.findMany()
  }

  async updateOne(slugOrId: string, body: any) {
    return await this.prisma.auction.update({
      where: {
        slug: slugOrId,
      },
      data: {
        content: body.content,
      },
    })
  }
}
