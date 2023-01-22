import { Controller, Get, Req } from "@nestjs/common"
import { UsersService } from "./users.service"
import { Request } from "express"
import { User } from "@art-nx/database"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  public async me(@Req() req: Request) {
    const { user } = req

    return this.usersService.sendUser(user as User)
  }
}
