import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { messages } from "@artsell/network"
import { CartItemRequest } from "@artsell/network"

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async groupCartByOwner(cartId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: {
          include: {
            product: true,
            delivery: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        user: true,
      },
    })

    if (!cart) throw new HttpException(messages.NOT_FOUND, HttpStatus.NOT_FOUND)

    const groupedItems = this.groupItemsByOwner(cart.items)

    return {
      ...cart,
      items: groupedItems,
      price: Number(this.countPriceOfCart(groupedItems).toFixed(2)),
    }
  }

  groupItemsByOwner(items: any) {
    return items.reduce((acc: any, item: any) => {
      const currentOwnerId = item.product.ownerId

      if (!acc[currentOwnerId]) {
        acc[currentOwnerId] = {
          items: [],
        }
      }

      acc[currentOwnerId].items.push(item)

      return acc
    }, {})
  }

  countPriceOfCart(cart: any) {
    const total = Object.values(cart).reduce((acc: number, item: any) => {
      const price = this.countPriceOfGroupedItems(item.items)
      return acc + price
    }, 0)

    return total
  }

  countPriceOfGroupedItems(groupedItems: any) {
    return groupedItems.reduce((acc: number, item: any) => {
      const price = item.product.price * item.quantity
      return acc + price
    }, 0)
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
    const cartItemInDB = await this.prisma.cartItem.findMany({
      where: {
        cartId,
        productId: data.productId,
      },
    })

    if (cartItemInDB.length)
      throw new HttpException(messages.ITEM_ALREADY_EXISTS, HttpStatus.CONFLICT)

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
