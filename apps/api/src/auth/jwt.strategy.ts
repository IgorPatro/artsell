import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "./auth.service"
import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { User } from "db"
import { messages } from "bff"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
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
