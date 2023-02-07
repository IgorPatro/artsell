import { Controller, Get } from "@nestjs/common"
import { Public } from "../decorators/public.decorator"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get("")
  public async findAll() {
    return this.productsService.findAll()
  }
}
