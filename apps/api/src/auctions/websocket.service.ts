import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from "@nestjs/websockets"
import { Socket, Server } from "socket.io"
import { PrismaService } from "../prisma.service"

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketGateway implements OnGatewayConnection {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server!: Server

  async handleConnection(socket: Socket) {
    const { auctionSlug } = socket.handshake.query
    if (!auctionSlug) return

    const auction = await this.prisma.auction.findFirst({
      where: {
        slug: auctionSlug as string,
      },
    })

    socket.emit("hello", auction?.currentPrice)
    return socket.join(auctionSlug)
  }

  @SubscribeMessage("bid")
  async handleBid(socket: Socket, newPrice: number) {
    console.log("bid", newPrice, socket.handshake.query, socket.id)

    const { auctionSlug } = socket.handshake.query
    if (!auctionSlug) return socket.emit("bid-fail", "No auction slug")

    const auction = await this.prisma.auction.findFirst({
      where: {
        slug: auctionSlug as string,
      },
    })

    if (!auction) return socket.emit("bid-fail", "Product not found")
    if (newPrice <= auction.currentPrice)
      return socket.emit("bid-fail", "Price too low")

    const updatedProduct = await this.prisma.auction.update({
      where: {
        slug: auctionSlug as string,
      },
      data: {
        currentPrice: newPrice,
      },
    })

    return this.server
      .to(auctionSlug)
      .emit("bid-success", updatedProduct.currentPrice)
  }
}
