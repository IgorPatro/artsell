import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "./auth.service"
import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { User } from "@artsell/database"
import { messages } from "@artsell/network"

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
        messages.USER_ALREADY_EXISTS,
        HttpStatus.UNAUTHORIZED,
      )
    }

    return user
  }
}
