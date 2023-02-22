import { z } from "zod"

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
})

export type CartItemRequest = z.infer<typeof CartItemSchema>

export const DeleteCartItemSchema = z.object({
  productId: z.string(),
})

export type DeleteCartItemRequest = z.infer<typeof DeleteCartItemSchema>
