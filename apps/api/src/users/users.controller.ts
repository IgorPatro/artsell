import { Controller, Get, Req } from "@nestjs/common"
import { UsersService } from "./users.service"
import { CartsService } from "../carts/carts.service"
import { Request } from "express"
import { User } from "@artsell/database"

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartsService: CartsService,
  ) {}

  @Get("me")
  public async me(@Req() req: Request) {
    const { user } = req

    return this.usersService.sendSafeUser(user as User)
  }

  @Get("me/cart")
  public async myCart(@Req() req: Request) {
    const { user } = req

    return this.cartsService.findUserCart((user as User).id)
  }
}
