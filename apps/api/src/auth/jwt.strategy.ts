import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "./auth.service"
import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { User } from "@art-nx/database"
import { messages } from "@art-nx/network"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "THIS_IS_MY_TEMPORARY_SECRET",
    })
  }

  async validate(payload: Partial<User>) {
    const user = await this.authService.validateUser(payload)

    if (!user) {
      throw new HttpException(
        messages.USER_ALREADY_EXIST,
        HttpStatus.UNAUTHORIZED,
      )
    }

    return user
  }
}
