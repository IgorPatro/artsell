import { z } from "zod"

export const CreateCartSchema = z.object({
  userId: z.string().optional(),
  productId: z.string(),
  productQuantity: z.number(),
})

export type CreateCartRequest = z.infer<typeof CreateCartSchema>
