import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"
import { safeUserData, safeLocationData } from "@artsell/utils"
import { BidHistory } from "@prisma/client"

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
        location: true,
      },
    })

    if (!auction)
      throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    const bidders = await this.prisma.bidHistory.groupBy({
      by: ["userId"],
      where: {
        auctionId: auction.id,
      },
    })

    return {
      ...auction,
      owner: safeUserData(auction.owner),
      location: safeLocationData(auction.location),
      bidders: bidders.length,
    }
  }

  async findAll() {
    const auctions = await this.prisma.auction.findMany({
      include: {
        owner: true,
        location: true,
        BidHistory: true,
      },
    })

    const countBidders = (history: BidHistory[]) => {
      return history.reduce((acc: string[], bid: BidHistory) => {
        if (acc.includes(bid.userId)) return acc
        return [...acc, bid.userId]
      }, [])
    }

    return auctions.map((auction) => ({
      ...auction,
      owner: safeUserData(auction.owner),
      location: safeLocationData(auction.location),
      bidders: countBidders(auction.BidHistory).length,
    }))
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
      take: 7,
    })

    if (!bids) throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return bids.map((bid) => ({
      ...bid,
      user: safeUserData(bid.user),
    }))
  }

  async getAuctionsWon(userId: string) {
    const auctionsWon = await this.prisma.auction.findMany({
      where: {
        winnerId: userId,
      },
      include: {
        owner: true,
        location: true,
      },
    })

    return auctionsWon.map((auction) => ({
      ...auction,
      owner: safeUserData(auction.owner),
      location: safeLocationData(auction.location),
    }))
  }
}
