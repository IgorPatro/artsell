import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import { hash } from "bcrypt"
import { PrismaService } from "../prisma.service"
import { LoginRequest, RegisterRequest, messages } from "@artsell/network"
import { User } from "@artsell/database"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  async register(user: RegisterRequest) {
    const userInDB = await this.usersService.findByPayload(user)

    if (userInDB) {
      throw new HttpException(messages.USER_ALREADY_EXISTS, HttpStatus.CONFLICT)
    }

    const {
      repPassword: __repPassword,
      isTermsAccepted: __isTermsAccepted,
      ...rest
    } = user

    const createdUser = await this.prisma.user.create({
      data: {
        ...rest,
        password: await hash(user.password, 10),
        cart: {
          create: {},
        },
      },
    })

    return this.usersService.sendSafeUserData(createdUser)
  }

  async login(credentials: LoginRequest) {
    const { email } = await this.usersService.findByCredentials(credentials)

    const token = this._createToken(email)

    return {
      ...token,
    }
  }

  private _createToken(email: string) {
    const Authorization = this.jwtService.sign({ email })

    return {
      Authorization,
    }
  }

  async validateUser(payload: Partial<User>) {
    const user = await this.usersService.findByPayload(payload)

    if (!user) {
      throw new HttpException(messages.INVALID_TOKEN, HttpStatus.UNAUTHORIZED)
    }

    return user
  }
}
