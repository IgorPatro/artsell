import { Module } from "@nestjs/common"
import { AuctionsController } from "./auctions.controller"
import { PrismaService } from "../prisma.service"
import { AuctionsService } from "./auctions.service"
import { WebsocketGateway } from "./websocket.service"

@Module({
  imports: [],
  exports: [],
  controllers: [AuctionsController],
  providers: [AuctionsService, PrismaService, WebsocketGateway],
})
export class AuctionsModule {}
