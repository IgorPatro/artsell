import { Controller, Get } from "@nestjs/common"
import { Public } from "../decorators/public.decorator"
import { AuctionsService } from "./auctions.service"

@Controller("auctions")
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Public()
  @Get("")
  public async findNew() {
    return {
      test: "trueee"
    }
  }
}
