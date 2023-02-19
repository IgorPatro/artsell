import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"
import { CartItemRequest } from "@artsell/network"

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

  async createCartWithFirstItem(data: CartItemRequest) {
    const cart = await this.prisma.cart.create({
      data: {
        items: {
          create: {
            quantity: data.quantity,
            productId: data.productId,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return cart
  }

  async appendCartItem(cartId: string, data: CartItemRequest) {
    const cartItem = await this.prisma.cartItem.create({
      data: {
        quantity: data.quantity,
        productId: data.productId,
        cartId,
      },
    })

    return cartItem
  }

  async deleteCartItem(cartId: string, productId: string) {
    const deletedCartItem = await this.prisma.cartItem.deleteMany({
      where: {
        productId,
        cartId,
      },
    })

    return deletedCartItem
  }

  async updateCartItem(cartId: string, data: CartItemRequest) {
    const updatedCartItem = await this.prisma.cartItem.updateMany({
      where: {
        productId: data.productId,
        cartId,
      },
      data: {
        quantity: data.quantity,
      },
    })

    return updatedCartItem
  }
}
