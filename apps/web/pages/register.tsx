import {
  RegisterSchema,
  type RegisterRequest,
  RegisterResponse,
} from "@art-nx/network"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSideProps } from "next"
import { getServerSession } from "../src/hooks/getServerSession"
import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import { network } from "../src/utils/network"
import { Button } from "@art-nx/ui"

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  })

  const router = useRouter()

  const { mutate, error, isError } = useMutation<
    RegisterResponse,
    Error,
    RegisterRequest
  >({
    mutationFn: async (data: RegisterRequest) =>
      network.post<RegisterResponse, RegisterRequest>("/auth/register", data),
    onSuccess: () => router.push("/login"),
  })

  const onSubmit = handleSubmit((data) => mutate(data))

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
      {isError && <p>{error.message}</p>}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
