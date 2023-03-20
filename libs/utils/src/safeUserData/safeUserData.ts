import { User } from "@prisma/client"

export const safeUserData = (user: User) => {
  const { email, phone, firstName, lastName } = user

  return {
    email,
    phone,
    firstName,
    lastName,
  }
}

export type SafeUserData = ReturnType<typeof safeUserData>
