import { z } from "zod"
import { User } from "../users/users"
import network from ".."

// REGISTER
export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Email nie jest poprawny" }),
    password: z
      .string()
      .min(6, { message: "Hasło musi mieć minimum 6 znaków" }),
    repPassword: z
      .string()
      .min(6, { message: "Hasło musi mieć minimum 6 znaków" }),
    firstName: z.string().min(3, { message: "Imię musi mieć minimum 3 znaki" }),
    lastName: z
      .string()
      .min(3, { message: "Nazwisko musi mieć minimum 3 znaki" }),
  })
  .refine((data) => data.password === data.repPassword, {
    message: "Hasła nie są identyczne",
    path: ["repPassword"],
  })

export type RegisterRequest = z.infer<typeof RegisterSchema>

export type RegisterResponse = User

export const fetchRegister = async (data: RegisterRequest) => {
  return await network.post<RegisterResponse, RegisterRequest>(
    "/auth/register",
    data,
  )
}

// LOGIN
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type LoginRequest = z.infer<typeof LoginSchema>

export type LoginResponse = {
  Authorization: string
}

export const fetchLogin = async (data: LoginRequest) => {
  return await network.post<LoginResponse, LoginRequest>("/auth/login", data)
}
