import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets"
import { Socket, Server } from "socket.io"
import { PrismaService } from "../prisma.service"

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebsocketGateway {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server!: Server

  @SubscribeMessage("bid")
  handleBid(client: Socket, data: string) {
    console.log(client.id)
    console.log(data)
    this.server.emit("auction", {
      msg: "NEW MESSAGE",
      data,
    })
  }
}
