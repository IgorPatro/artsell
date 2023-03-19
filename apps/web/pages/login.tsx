import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { getServerSession } from "@artsell/hooks"
import { sessionCookieName } from "@artsell/constants"
import { setCookie } from "nookies"
import {
  LoginSchema,
  LoginRequest,
  LoginResponse,
  fetchLogin,
} from "@artsell/network"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()
  const queryClient = useQueryClient()

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => fetchLogin(data),
    onSuccess: ({ Authorization }) => {
      setCookie(null, sessionCookieName, Authorization)
      router.push("/")
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
    onError: (error) => console.log(error.message),
  })

  const onSubmit = handleSubmit((data) => loginMutation.mutate(data))

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
      <button type="submit">Zaloguj się</button>
    </form>
  )
}

export default LoginPage

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
