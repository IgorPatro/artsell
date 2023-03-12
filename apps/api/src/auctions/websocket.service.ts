import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from "@nestjs/websockets"
import { Socket, Server } from "socket.io"
import { PrismaService } from "../prisma.service"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "../auth/auth.service"
import { User } from "@artsell/database"

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketGateway implements OnGatewayConnection {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

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

    if (!auction) return socket.emit("bid-fail", "Auction not found")

    socket.emit("hello", auction.currentPrice)
    return socket.join(auctionSlug)
  }

  @SubscribeMessage("bid")
  async handleBid(
    socket: Socket,
    data: {
      newPrice: number
      session: string
    },
  ) {
    const { auctionSlug } = socket.handshake.query
    if (!auctionSlug) return socket.emit("bid-fail", "No auction slug")
    if (!data.session) return socket.emit("bid-fail", "No session")
    if (!data.newPrice) return socket.emit("bid-fail", "No price")

    const tokenVerify = this.jwtService.decode(data.session) as User
    if (!tokenVerify) return socket.emit("bid-fail", "Invalid session")

    const user = await this.authService.validateUser(tokenVerify)
    if (!user) return socket.emit("bid-fail", "Invalid session")

    const auction = await this.prisma.auction.findFirst({
      where: {
        slug: auctionSlug as string,
      },
    })

    if (!auction) return socket.emit("bid-fail", "Auction not found")
    if (data.newPrice <= auction.currentPrice)
      return socket.emit("bid-fail", "Price too low")

    const updatedAuction = await this.prisma.auction.update({
      where: {
        slug: auctionSlug as string,
      },
      data: {
        currentPrice: data.newPrice,
      },
    })
    await this.prisma.bidHistory.create({
      data: {
        price: data.newPrice,
        auction: {
          connect: {
            slug: auctionSlug as string,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        socketId: socket.id,
      },
    })

    return this.server
      .to(auctionSlug)
      .emit("bid-success", updatedAuction.currentPrice)
  }
}
