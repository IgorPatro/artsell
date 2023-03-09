import { z } from "zod"
import {
  Cart as CartDB,
  CartItem as CartItemDB,
  Product as ProductDB,
} from "@artsell/database"

export interface CartItem extends CartItemDB {
  product: ProductDB
}

export interface Cart extends CartDB {
  items: CartItem[]
}

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
})

export type CartItemRequest = z.infer<typeof CartItemSchema>

export const DeleteCartItemSchema = z.object({
  productId: z.string(),
})

export type DeleteCartItemRequest = z.infer<typeof DeleteCartItemSchema>
