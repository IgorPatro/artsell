import { z } from "zod"

export const ResetPasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
})

export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>
