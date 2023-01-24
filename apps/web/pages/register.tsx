import { RegisterSchema, type RegisterRequest } from "@art-nx/network"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@art-nx/ui"

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        width: "300px",
      }}
      onSubmit={onSubmit}
    >
      <input
        style={{ border: `1px solid ${errors.firstName ? "red" : "black"}` }}
        placeholder="firstName"
        {...register("firstName")}
      />
      {errors?.firstName?.message}
      <input
        style={{ border: `1px solid ${errors.lastName ? "red" : "black"}` }}
        placeholder="lastName"
        {...register("lastName")}
      />
      {errors?.lastName?.message}
      <input
        style={{ border: `1px solid ${errors.email ? "red" : "black"}` }}
        placeholder="email"
        {...register("email")}
      />
      {errors?.email?.message}
      <input
        style={{ border: `1px solid ${errors.password ? "red" : "black"}` }}
        placeholder="password"
        type="password"
        {...register("password")}
      />
      {errors?.password?.message}
      <input
        style={{ border: `1px solid ${errors.repPassword ? "red" : "black"}` }}
        placeholder="repPassword"
        type="password"
        {...register("repPassword")}
      />
      {errors?.repPassword?.message}
      <Button type="submit">Zarejestruj się</Button>
    </form>
  )
}

export default RegisterPage
