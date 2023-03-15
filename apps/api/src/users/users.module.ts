import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { PrismaService } from "../prisma.service"
import { CartsService } from "../carts/carts.service"

@Module({
  imports: [],
  exports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CartsService],
})
export class UsersModule {}
