import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { getServerSession } from "@artsell/hooks"
import { sessionCookieName } from "@artsell/constants"
import { setCookie } from "nookies"
import { Button } from "@artsell/ui"
import network, {
  LoginSchema,
  LoginRequest,
  LoginResponse,
} from "@artsell/network"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()

  const { mutate } = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) =>
      network.post<LoginResponse, LoginRequest>("/auth/login", data),
    onSuccess: ({ Authorization }) => {
      setCookie(null, sessionCookieName, Authorization)
      router.push("/")
    },
    onError: (error) => console.log(error.message),
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
      <Button type="submit">Zaloguj się</Button>
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
