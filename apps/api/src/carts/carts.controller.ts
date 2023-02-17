import { Controller, Get, Param, Post } from "@nestjs/common"
import { CartsService } from "./carts.service"
import { Public } from "../decorators/public.decorator"

@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Public()
  @Get(":cartId")
  public async findOne(@Param("cartId") cartId: string) {
    return this.cartsService.findCart(cartId)
  }

  // @Public()
  // @Post("")
  // public async create() {
  //   return this.cartsService.createCart(userId)
  // }
}
