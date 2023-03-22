import { useRouter } from "next/router"
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
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react"
import NextLink from "next/link"

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  })
  const toast = useToast()

  const router = useRouter()
  const queryClient = useQueryClient()

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => fetchLogin(data),
    onSuccess: ({ Authorization }) => {
      setCookie(null, sessionCookieName, Authorization)
      queryClient.invalidateQueries({ queryKey: ["me"] })
      router.push("/")
    },
    onError: (error) =>
      toast({
        title: "Błąd logowania",
        position: "bottom-right",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  })

  const onSubmit = handleSubmit((data) => loginMutation.mutate(data))

  return (
    <Box className="flex flex-col max-w-sm bg-white shadow-lg p-10 rounded-lg">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <FormControl isInvalid={!!errors.email}>
          <Input placeholder="Email" {...register("email")} />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <Input
            placeholder="Hasło"
            type="password"
            {...register("password")}
          />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={loginMutation.isLoading}>
          Zaloguj się
        </Button>
      </form>
      <Text color="gray.600" mt="5" mb="3">
        Nie masz konta?{" "}
        <Link as={NextLink} href="/register" color="yellow.400">
          Zarejestruj się
        </Link>
      </Text>
      <Text color="gray.600" fontSize="xs">
        Logując się do Artsell akceptujesz{" "}
        <Link as={NextLink} href="/regulamin" color="yellow.400">
          Regulamin
        </Link>{" "}
        w aktualnym brzmieniu obowiązującym od dnia 21.03.2023. Informacje o
        planowanych oraz archiwalnych zmianach Regulaminu są dostępne na
        stronie.
      </Text>
    </Box>
  )
}
