import { Module } from "@nestjs/common"
import { ProductsController } from "./products.controller"
import { PrismaService } from "../prisma.service"
import { ProductsService } from "./products.service"

@Module({
  imports: [],
  exports: [],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
