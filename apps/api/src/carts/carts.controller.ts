import { Controller, Get, Param, Post, Body, Delete, Put } from "@nestjs/common"
import { CartsService } from "./carts.service"
import { Public } from "../decorators/public.decorator"
import { Validate } from "../decorators/validate.decorator"
import {
  CartItemSchema,
  CartItemRequest,
  DeleteCartItemSchema,
  DeleteCartItemRequest,
} from "@artsell/network"

// GET/:cartId
// POST - {productId, quantity} (tworzymy nowy cart)
// POST/:cartId - {productId, quantity}
// DELETE/:cartId - {productId}
// PUT/:cartId - {productId, quantity}

@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Public()
  @Get("/:cartId")
  public async findOne(@Param("cartId") cartId: string) {
    return this.cartsService.findCart(cartId)
  }

  @Public()
  @Post("/")
  @Validate(CartItemSchema)
  public async createNewCart(@Body() body: CartItemRequest) {
    return this.cartsService.createCartWithFirstItem(body)
  }

  @Public()
  @Post("/:cartId")
  @Validate(CartItemSchema)
  public async addCartItemToCart(
    @Param("cartId") cartId: string,
    @Body() body: CartItemRequest,
  ) {
    return this.cartsService.appendCartItem(cartId, body)
  }

  @Public()
  @Delete("/:cartId")
  @Validate(DeleteCartItemSchema)
  public async deleteCartItemFromCart(
    @Param("cartId") cartId: string,
    @Body() { productId }: DeleteCartItemRequest,
  ) {
    return this.cartsService.deleteCartItem(cartId, productId)
  }

  @Public()
  @Put("/:cartId")
  @Validate(CartItemSchema)
  public async updateCartItemAtCart(
    @Param("cartId") cartId: string,
    @Body() body: CartItemRequest,
  ) {
    return this.cartsService.updateCartItem(cartId, body)
  }
}
