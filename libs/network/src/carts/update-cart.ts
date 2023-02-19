import { z } from "zod"

export const UpdateCartSchema = z.object({
  productId: z.string(),
  productQuantity: z.number(),
})

export type UpdateCartRequest = z.infer<typeof UpdateCartSchema>
