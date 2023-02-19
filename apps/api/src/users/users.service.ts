import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { compare } from "bcrypt"
import { PrismaService } from "../prisma.service"
import { LoginRequest, messages } from "@artsell/network"
import { User } from "@artsell/database"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByCredentials({ email, password }: LoginRequest) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      throw new HttpException(
        messages.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      )
    }

    const areEqual = await compare(password, user.password)

    if (!areEqual) {
      throw new HttpException(
        messages.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      )
    }

    const { password: __password, ...rest } = user

    return rest
  }

  async findByPayload({ email }: Partial<User>) {
    return await this.prisma.user.findFirst({
      where: { email },
    })
  }

  async sendSafeUserData(user: User) {
    const { password: __password, ...rest } = user

    return rest
  }
}
