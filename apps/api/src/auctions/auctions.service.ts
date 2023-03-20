import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"
import { safeUserData } from "@artsell/utils"

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(slugOrId: string) {
    const auction = await this.prisma.auction.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
      include: {
        owner: true,
      },
    })

    if (!auction)
      throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return {
      ...auction,
      owner: safeUserData(auction.owner),
    }
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

  async getBids(auctionId: string) {
    const bids = await this.prisma.bidHistory.findMany({
      where: {
        auctionId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!bids) throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return bids.map((bid) => ({
      ...bid,
      user: safeUserData(bid.user),
    }))
  }
}
