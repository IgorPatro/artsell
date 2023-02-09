import { Controller, Get } from "@nestjs/common"
import { Public } from "./decorators/public.decorator"

@Controller()
export class AppController {
  @Public()
  @Get()
  welcome() {
    return `
      <html>
        <head>
          <title>Artsell API</title>
          <style>
            body {
              color: white;
              background-color: black;
              font-family: sans-serif;
            }
          </style>
        </head>
        <body>
          <h1>Artsell API Server</h1>
          <h2>Server is ONLINE</h2>
          <h5>PS: We love Black ❤</h5>
          ${process.env.NODE_ENV}
        </body>
      </html>
    `
  }
}
