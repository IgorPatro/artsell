import { z } from 'zod';

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: 'Email nie jest poprawny' }),
    password: z
      .string()
      .min(6, { message: 'Hasło musi mieć minimum 6 znaków' }),
    repPassword: z
      .string()
      .min(6, { message: 'Hasło musi mieć minimum 6 znaków' }),
    firstName: z.string().min(3, { message: 'Imię musi mieć minimum 3 znaki' }),
    lastName: z
      .string()
      .min(3, { message: 'Nazwisko musi mieć minimum 3 znaki' }),
  })
  .refine((data) => data.password === data.repPassword, {
    message: 'Hasła nie są identyczne',
    path: ['repPassword'],
  });

export type RegisterRequest = z.infer<typeof RegisterSchema>;
