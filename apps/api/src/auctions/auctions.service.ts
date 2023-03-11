import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}
}
