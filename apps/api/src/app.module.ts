import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { PrismaService } from "./prisma.service"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { ProductsModule } from "./products/products.module"
import { AuctionsModule } from "./auctions/auctions.module"
import { JwtAuthGuard } from "./auth/jwt-auth.guard"
import { ConfigModule } from "@nestjs/config"
import { ScheduleModule } from "@nestjs/schedule"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    AuctionsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: "APP_GUARD",
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
