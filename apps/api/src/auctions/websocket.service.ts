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
    const { productSlug } = socket.handshake.query
    if (!productSlug) return

    const product = await this.prisma.product.findFirst({
      where: {
        slug: productSlug as string,
      },
    })

    socket.emit("hello", product?.price)
    return socket.join(productSlug)
  }

  @SubscribeMessage("bid")
  async handleBid(socket: Socket, newPrice: number) {
    console.log("bid", newPrice, socket.handshake.query.productSlug, socket.id)

    const { productSlug } = socket.handshake.query
    if (!productSlug) return socket.emit("bid-fail", "No product slug")

    const product = await this.prisma.product.findFirst({
      where: {
        slug: productSlug as string,
      },
    })

    if (!product) return socket.emit("bid-fail", "Product not found")
    if (newPrice <= product.price)
      return socket.emit("bid-fail", "Price too low")

    const updatedProduct = await this.prisma.product.update({
      where: {
        slug: productSlug as string,
      },
      data: {
        price: newPrice,
      },
    })

    return this.server.to(productSlug).emit("bid-success", updatedProduct.price)
  }
}
