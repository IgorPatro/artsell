import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { Public } from "../decorators/public.decorator"
import { Validate } from "../decorators/validate.decorator"
import {
  RegisterSchema,
  RegisterRequest,
  LoginSchema,
  LoginRequest,
} from "@art-nx/network"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Validate(RegisterSchema as any)
  @Post("register")
  public async register(@Body() body: RegisterRequest) {
    return await this.authService.register(body)
  }

  @Public()
  @Validate(LoginSchema as any)
  @Post("login")
  public async login(@Body() body: LoginRequest) {
    return await this.authService.login(body)
  }
}
