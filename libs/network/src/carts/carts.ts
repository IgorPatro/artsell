import { z } from "zod"
import {
  Cart as CartDB,
  CartItem as CartItemDB,
  Product as ProductDB,
} from "@artsell/database"
import network from ".."
import { useQuery } from "@tanstack/react-query"

export interface CartItem extends CartItemDB {
  product: ProductDB
}

export interface Cart extends CartDB {
  items: CartItem[]
}

export const fetchCart = async (cartId?: string) => {
  return await network.get<Cart>(`/carts/${cartId}`)
}

export const useCartQuery = (enabled: boolean, cartId?: string) =>
  useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(cartId),
    enabled,
  })

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
})

export type CartItemRequest = z.infer<typeof CartItemSchema>

export const DeleteCartItemSchema = z.object({
  productId: z.string(),
})

export type DeleteCartItemRequest = z.infer<typeof DeleteCartItemSchema>
