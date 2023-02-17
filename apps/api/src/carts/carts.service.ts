import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async findCart(cartId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    })

    if (!cart) throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return cart
  }

  async findUserCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart) throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    return cart
  }

  async createCart(userId: string) {
    const cart = await this.prisma.cart.create({
      data: {
        userId,
      },
    })

    return cart
  }

  async createCartItem(cartId: string, productId: string, quantity: number) {
    const item = await this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    })

    return item
  }

  async updateCartItem(cartItemId: string, quantity: number) {
    const item = await this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    })

    return item
  }

  async deleteCartItem(cartItemId: string) {
    const item = await this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    })

    return item
  }
}
