import { Module } from "@nestjs/common"
import { AuctionsController } from "./auctions.controller"
import { PrismaService } from "../prisma.service"
import { AuctionsService } from "./auctions.service"
import { WebsocketGateway } from "./websocket.service"
import { AuthService } from "../auth/auth.service"
import { UsersService } from "../users/users.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRY || "14 days",
      },
    }),
  ],
  controllers: [AuctionsController],
  providers: [
    AuctionsService,
    PrismaService,
    WebsocketGateway,
    AuthService,
    UsersService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuctionsModule {}
