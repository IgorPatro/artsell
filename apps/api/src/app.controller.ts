import { Controller, Get } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  // @Public()
  @Get()
  welcome() {
    return `
      <html>
        <head>
          <title>ART API</title>
          <style>
            body {
              color: white;
              background-color: black;
            }
          </style>
        </head>
        <body>
          <h1>ART API Server</h1>
          <h2>Server is ONLINE</h2>
          <h5>PS: We love Black ❤</h5>
        </body>
      </html>
    `
  }

  // @Public()
  // @Validate(RegisterSchema)
  // @Post('test')
  // async testPost(@Body() body: RegisterRequest) {
  //   const user = await this.prisma.user.findFirst({
  //     where: { email: body.email },
  //   });

  //   if (!user) {
  //     throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  //   }

  //   return user;
  // }

  // @Public()
  @Get("users-test")
  async testGet() {
    const users = await this.prisma.user.findMany()

    // throw new HttpException('TEST', 909);

    return users
  }
}
