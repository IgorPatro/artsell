import { Body, Controller, Get, Param, Put } from "@nestjs/common"
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

  @Public()
  @Put(":slugOrId")
  public async updateOne(
    @Param("slugOrId") slugOrId: string,
    @Body() body: any,
  ) {
    return this.auctionsService.updateOne(slugOrId, body)
  }

  @Public()
  @Get(":auctionId/bids")
  public async getBids(@Param("auctionId") auctionId: string) {
    return this.auctionsService.getBids(auctionId)
  }
}
