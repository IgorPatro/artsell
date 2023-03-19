import { Controller, Get, Param } from "@nestjs/common"
import { Public } from "../decorators/public.decorator"
import { AuctionsService } from "./auctions.service"

@Controller("auctions")
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Public()
  @Get(":slugOrId")
  public async findOne(@Param("slugOrId") slugOrId: string) {
    return this.auctionsService.findOne(slugOrId)
  }

  @Public()
  @Get()
  public async findAll() {
    return this.auctionsService.findAll()
  }
}
