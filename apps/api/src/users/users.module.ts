import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { PrismaService } from "../prisma.service"
import { CartsService } from "../carts/carts.service"
import { AuctionsService } from "../auctions/auctions.service"

@Module({
  imports: [],
  exports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CartsService, AuctionsService],
})
export class UsersModule {}
