import { Controller, Get, Param } from "@nestjs/common"
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

  @Public()
  @Get(":slugOrId")
  public async findOne(@Param("slugOrId") slugOrId: string) {
    return this.productsService.findOne(slugOrId)
  }

  @Public()
  @Get("/new")
  public async findNew() {
    return this.productsService.findNew()
  }
}
